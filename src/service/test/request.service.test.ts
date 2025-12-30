import {
  describe,
  expect,
  mock,
  test,
  spyOn,
  beforeEach,
  afterEach,
} from "bun:test";
import { IRequest } from "@/domain/request";
import { AddRequest, GetRequests } from "../request.service";
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
