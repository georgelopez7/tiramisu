import {
  describe,
  expect,
  mock,
  test,
  spyOn,
  beforeEach,
  afterEach,
} from "bun:test";
import { IRequest, IRequestHeader, IRequestParam } from "@/domain/request";
import {
  AddRequest,
  GetRequestByID,
  GetRequests,
  GetRequestSignature,
  GetRequestTimestamp,
  HandleRequest,
} from "../request.service";
import { NextRequest } from "next/server";
import * as repository from "../../repository/repository";

describe("TestService_AddRequest", () => {
  let addRequestSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    addRequestSpy = spyOn(repository, "AddRequest");
  });

  afterEach(() => {
    mock.restore();
  });

  test("should add request", async () => {
    const mockRequest = {
      method: "GET",
      path: "/test",
      ip: "127.0.0.1",
      payload: "test",
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
        },
      ],
    } as IRequest;

    addRequestSpy.mockResolvedValue(123);

    const requestID = await AddRequest(mockRequest);

    expect(requestID).toBe(123);
    expect(addRequestSpy).toHaveBeenCalledTimes(1);
    expect(addRequestSpy).toHaveBeenCalledWith(mockRequest);
  });
});

describe("TestService_GetRequests", () => {
  let getRequestsSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    getRequestsSpy = spyOn(repository, "GetRequests");
  });

  afterEach(() => {
    mock.restore();
  });

  test("should get requests", async () => {
    const mockRequests = [
      {
        id: 123,
        method: "GET",
        path: "/test",
        ip: "127.0.0.1",
        payload: "test",
        headers: [
          {
            id: 123,
            key: "Content-Type",
            value: "application/json",
            request_id: 123,
          },
        ],
      },
    ];

    getRequestsSpy.mockResolvedValue(mockRequests);

    const requests = await GetRequests();

    expect(requests).toBe(mockRequests);
    expect(getRequestsSpy).toHaveBeenCalledTimes(1);
  });
});

describe("TestService_GetRequestByID", () => {
  let getRequestByIDSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    getRequestByIDSpy = spyOn(repository, "GetRequestByID");
  });

  afterEach(() => {
    mock.restore();
  });

  test("should get requests", async () => {
    const mockID = 123;
    const mockRequest = {
      id: mockID,
      method: "GET",
      path: "/test",
      ip: "127.0.0.1",
      payload: "test",
      headers: [
        {
          id: 123,
          key: "Content-Type",
          value: "application/json",
          request_id: 123,
        },
      ],
    } as IRequest;

    getRequestByIDSpy.mockResolvedValue(mockRequest);

    const request = await GetRequestByID(mockID);

    expect(request).toBe(mockRequest);
    expect(getRequestByIDSpy).toHaveBeenCalledTimes(1);
    expect(getRequestByIDSpy).toHaveBeenCalledWith(mockID);
  });
});

describe("TestService_GetRequestTimestamp", () => {
  test("should get request timestamp", async () => {
    const mockHeaders = [
      {
        key: "X-Timestamp",
        value: "1689968000",
      },
    ] as IRequestHeader[];

    const { timestamp, error } = await GetRequestTimestamp(
      mockHeaders,
      "X-Timestamp"
    );

    expect(timestamp).toBe(1689968000);
    expect(error).toBeNull();
  });

  test("should handle case when no headers are provided", async () => {
    const mockHeaders = [] as IRequestHeader[];

    const { timestamp, error } = await GetRequestTimestamp(
      mockHeaders,
      "X-Timestamp"
    );

    expect(timestamp).toBe(0);
    expect(error).toBeNull();
  });

  test("should handle case when header is not found", async () => {
    const mockHeaders = [
      {
        key: "X-Not-Found",
        value: "1689968000",
      },
    ] as IRequestHeader[];

    const { timestamp, error } = await GetRequestTimestamp(
      mockHeaders,
      "X-Timestamp"
    );

    expect(timestamp).toBe(0);
    expect(error).toBeDefined();
  });

  test("should handle case when timestamp is NOT a valid integer", async () => {
    const mockHeaders = [
      {
        key: "X-Not-Found",
        value: "invalid-integer",
      },
    ] as IRequestHeader[];

    const { timestamp, error } = await GetRequestTimestamp(
      mockHeaders,
      "X-Timestamp"
    );

    expect(timestamp).toBe(0);
    expect(error).toBeDefined();
  });
});

describe("TestService_GetRequestSignature", () => {
  test("should get request signature", async () => {
    const mockHeaders = [
      {
        key: "X-Signature",
        value: "1234567890",
      },
    ] as IRequestHeader[];

    const { signature, error } = await GetRequestSignature(
      mockHeaders,
      "X-Signature"
    );

    expect(signature).toBe("1234567890");
    expect(error).toBeNull();
  });

  test("should handle case when no headers are provided", async () => {
    const mockHeaders = [] as IRequestHeader[];

    const { signature, error } = await GetRequestSignature(
      mockHeaders,
      "X-Signature"
    );

    expect(signature).toBe("");
    expect(error).toBeNull();
  });

  test("should handle case when header is not found", async () => {
    const mockHeaders = [
      {
        key: "X-Not-Found",
        value: "1234567890",
      },
    ] as IRequestHeader[];

    const { signature, error } = await GetRequestSignature(
      mockHeaders,
      "X-Signature"
    );

    expect(signature).toBe("");
    expect(error).toBeDefined();
  });
});

describe("TestService_HandleRequest", () => {
  test("should handle request with all fields", async () => {
    const request = new NextRequest(
      "http://example.com/path?key1=value1&key2=value2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "test-agent",
          "X-Forwarded-For": "192.168.1.1",
        },
        body: "payload data",
      }
    );

    const req = await HandleRequest(request);

    expect(req.method).toBe("POST");
    expect(req.path).toBe("/path?key1=value1&key2=value2");
    expect(req.ip).toBe("192.168.1.1");
    expect(req.payload).toBe("payload data");
    expect(req.headers).toEqual([
      { key: "Content-Type", value: "application/json" },
      { key: "User-Agent", value: "test-agent" },
      { key: "X-Forwarded-For", value: "192.168.1.1" },
    ] as IRequestHeader[]);
    expect(req.params).toEqual([
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ] as IRequestParam[]);
  });

  test("should handle request without X-Forwarded-For header", async () => {
    const request = new NextRequest("http://example.com/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "payload data",
    });

    const req = await HandleRequest(request);

    expect(req.method).toBe("POST");
    expect(req.path).toBe("/path");
    expect(req.ip).toBe("unknown");
    expect(req.payload).toBe("payload data");
    expect(req.headers).toEqual([
      { key: "Content-Type", value: "application/json" },
    ] as IRequestHeader[]);
    expect(req.params).toEqual([]);
  });

  test("should handle request with no search params", async () => {
    const request = new NextRequest("http://example.com/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "test-agent",
        "X-Forwarded-For": "192.168.1.1",
      },
      body: "payload data",
    });

    const result = await HandleRequest(request);

    expect(result.method).toBe("POST");
    expect(result.path).toBe("/path");
    expect(result.ip).toBe("192.168.1.1");
    expect(result.payload).toBe("payload data");
    expect(result.headers).toEqual([
      { key: "Content-Type", value: "application/json" },
      { key: "User-Agent", value: "test-agent" },
      { key: "X-Forwarded-For", value: "192.168.1.1" },
    ] as IRequestHeader[]);
    expect(result.params).toEqual([]);
  });
});
