import { describe, expect, mock, test } from "bun:test";
import { IRequest } from "@/domain/request";
import { AddRequest, GetRequests } from "../request.service";

const request = {
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

const mockAddRequest = mock(() =>
  Promise.resolve({
    id: 123,
    ...request,
    headers: [
      {
        key: "Content-Type",
        value: "application/json",
        request_id: 123,
      },
    ],
  } as IRequest)
);

const mockGetRequests = mock(() =>
  Promise.resolve([
    {
      id: 123,
      method: "GET",
      path: "/test",
      ip: "127.0.0.1",
      payload: "test",
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
          request_id: 123,
        },
      ],
    },
  ])
);

describe("TestService_AddRequest", () => {
  mock.module("../../repository/repository", () => ({
    AddRequest: mockAddRequest,
  }));

  test("should add request", async () => {
    const result = await AddRequest(request);
    expect(result.id).toBe(123);
    expect(result.method).toBe(request.method);
    expect(result.path).toBe(request.path);
    expect(result.ip).toBe(request.ip);
    expect(result.payload).toBe(request.payload);
    expect(result.headers).toEqual([
      {
        key: "Content-Type",
        value: "application/json",
        request_id: 123,
      },
    ]);
  });
});

describe("TestService_GetRequests", () => {
  mock.module("../../repository/repository", () => ({
    GetRequests: mockGetRequests,
  }));

  test("should get requests", async () => {
    const result = await GetRequests();
    expect(result).toEqual([
      {
        id: 123,
        method: "GET",
        path: "/test",
        ip: "127.0.0.1",
        payload: "test",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
            request_id: 123,
          },
        ],
      },
    ]);
  });
});
