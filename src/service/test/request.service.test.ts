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

// mockAddRequest - mock AddRequest function
const mockAddRequest = mock(() => Promise.resolve(123));

// mockGetRequests - mock GetRequests function
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
          id: 123,
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
    const requestID = await AddRequest(request);
    expect(requestID).toBe(123);
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
            id: 123,
            key: "Content-Type",
            value: "application/json",
            request_id: 123,
          },
        ],
      },
    ]);
  });
});
