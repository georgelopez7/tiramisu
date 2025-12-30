import { describe, expect, test, beforeEach } from "bun:test";
import {
  AddRequest,
  GetRequestByID,
  GetRequests,
  ResetRequestsTable,
} from "../repository";
import { IRequest } from "@/domain/request";

describe("TestRepository_AddRequest", () => {
  beforeEach(async () => {
    await ResetRequestsTable();
  });

  test("should insert a request without headers and return the RequestID", async () => {
    const request = {
      method: "GET",
      path: "/api/test",
      ip: "192.168.1.1",
      payload: '{"test": "data"}',
    } as IRequest;

    const requestID = await AddRequest(request);
    console.log("💨 Request ID: ", requestID);
    const result = (await GetRequestByID(requestID)) as IRequest;

    expect(result.id).toBeDefined();
    expect(result.method).toBe(request.method);
    expect(result.path).toBe(request.path);
    expect(result.ip).toBe(request.ip);
    expect(result.payload).toBe(request.payload);
    expect(result.headers!.length).toBe(0);
  });

  test("should insert a request with headers and return the RequestID", async () => {
    const request = {
      method: "POST",
      path: "/api/test2",
      ip: "192.168.1.2",
      payload: '{"test": "data2"}',
      headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Bearer token" },
      ],
    } as IRequest;

    const requestID = await AddRequest(request);
    const result = (await GetRequestByID(requestID)) as IRequest;

    expect(result.id).toBeDefined();
    expect(result.method).toBe(request.method);
    expect(result.path).toBe(request.path);
    expect(result.ip).toBe(request.ip);
    expect(result.payload).toBe(request.payload);

    expect(result.headers!.length).toBe(2);
    result.headers!.forEach((header) => {
      expect(header.id).toBeDefined();
    });

    expect(
      result.headers!.find((header) => header.key === "Content-Type")
    ).toBeDefined();
    expect(
      result.headers!.find((header) => header.key === "Authorization")
    ).toBeDefined();
    expect(
      result.headers!.find((header) => header.key === "Content-Type")!.value
    ).toBe("application/json");
    expect(
      result.headers!.find((header) => header.key === "Authorization")!.value
    ).toBe("Bearer token");
  });
});

describe("TestRepository_GetRequests", () => {
  beforeEach(async () => {
    await ResetRequestsTable();
  });

  test("should return all requests with their headers", async () => {
    const request1 = {
      method: "GET",
      path: "/api/test1",
      ip: "192.168.1.1",
      payload: '{"test": "data1"}',
      headers: [{ key: "Accept", value: "application/json" }],
    } as IRequest;

    await AddRequest(request1);

    const request2 = {
      method: "POST",
      path: "/api/test2",
      ip: "192.168.1.2",
      payload: '{"test": "data2"}',
      headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Bearer token" },
      ],
    } as IRequest;

    await AddRequest(request2);

    const results = await GetRequests();
    const req1 = results.find((r) => r.path === "/api/test1");
    const req2 = results.find((r) => r.path === "/api/test2");

    expect(results.length).toBe(2);

    expect(req1).toBeDefined();
    expect(req1!.method).toBe(request1.method);
    expect(req1!.headers!.length).toBe(1);
    expect(req1!.headers![0].key).toBe(request1.headers![0].key);
    expect(req1!.headers![0].value).toBe(request1.headers![0].value);

    expect(req2).toBeDefined();
    expect(req2!.method).toBe(request2.method);
    expect(req2!.headers!.length).toBe(2);
    expect(req2!.headers!.map((header) => header.key)).toEqual(
      expect.arrayContaining(["Content-Type", "Authorization"])
    );
    expect(req2!.headers!.map((header) => header.value)).toEqual(
      expect.arrayContaining(["application/json", "Bearer token"])
    );
  });

  test("should return empty array if no requests", async () => {
    const requests = await GetRequests();
    expect(requests.length).toBe(0);
  });
});

describe("TestRepository_GetRequestByID", () => {
  beforeEach(async () => {
    await ResetRequestsTable();
  });

  test("should return request with headers by id", async () => {
    const request = {
      method: "POST",
      path: "/api/test",
      ip: "192.168.1.1",
      payload: '{"data": "test"}',
      headers: [
        { key: "Content-Type", value: "application/json", request_id: 0 },
        { key: "Authorization", value: "Bearer token", request_id: 0 },
      ],
    };

    const requestID = await AddRequest(request);
    const result = (await GetRequestByID(requestID)) as IRequest;

    expect(result.id).toBe(requestID);
    expect(result.method).toBe(request.method);
    expect(result.path).toBe(request.path);
    expect(result.ip).toBe(request.ip);
    expect(result.payload).toBe(request.payload);
    expect(result.headers!.length).toBe(2);
    expect(result.headers!.map((header) => header.key)).toEqual(
      expect.arrayContaining(["Content-Type", "Authorization"])
    );
    expect(result!.headers!.map((header) => header.value)).toEqual(
      expect.arrayContaining(["application/json", "Bearer token"])
    );
  });

  test("should return request without headers by id", async () => {
    const request = {
      method: "GET",
      path: "/api/test",
      ip: "192.168.1.1",
      payload: '{"data": "test"}',
    };

    const requestID = await AddRequest(request);
    const result = (await GetRequestByID(requestID)) as IRequest;

    expect(result.id).toBe(requestID);
    expect(result.method).toBe(request.method);
    expect(result.path).toBe(request.path);
    expect(result.ip).toBe(request.ip);
    expect(result.payload).toBe(request.payload);
    expect(result.headers!.length).toBe(0);
  });

  test("should return null if request not found", async () => {
    const result = await GetRequestByID(999);
    expect(result).toBeNull();
  });
});
