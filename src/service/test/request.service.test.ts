import {
  describe,
  expect,
  mock,
  test,
  spyOn,
  beforeEach,
  afterEach,
} from "bun:test";
import { IRequest, IRequestHeader } from "@/domain/request";
import {
  AddRequest,
  GetRequestByID,
  GetRequests,
  GetRequestSignature,
  GetRequestTimestamp,
} from "../request.service";
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
