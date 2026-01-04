"use server";

import { IRequest, IRequestHeader, IRequestParam } from "@/domain/request";
import {
  AddRequest as AddRequestRepo,
  GetRequests as GetRequestsRepo,
  GetRequestByID as GetRequestByIDRepo,
} from "../repository/repository";
import { NextRequest } from "next/server";

// AddRequest - add a new request
export const AddRequest = async (request: IRequest): Promise<number> => {
  const requestID = await AddRequestRepo(request);
  return requestID;
};

// GetRequests - get all requests
export const GetRequests = async (): Promise<IRequest[]> => {
  const requests = await GetRequestsRepo();
  return requests;
};

// GetRequestByID - get a request by ID
export const GetRequestByID = async (id: number): Promise<IRequest | null> => {
  const request = await GetRequestByIDRepo(id);
  return request;
};

// GetRequestTimestamp - get the timestamp of a request
export const GetRequestTimestamp = async (
  headers: IRequestHeader[],
  headerName: string
): Promise<{
  timestamp: number;
  error: string | null;
}> => {
  if (headers.length === 0) {
    return {
      timestamp: 0,
      error: null,
    };
  }

  const header = headers.find((header) => header.key === headerName);
  if (!header) {
    return {
      timestamp: 0,
      error: `Header not found. Header Name - ${headerName}`,
    };
  }

  try {
    return {
      timestamp: parseInt(header.value),
      error: null,
    };
  } catch {
    return {
      timestamp: 0,
      error: `Header value is not a valid integer. Header Name - ${headerName}. Header Value - ${header.value}`,
    };
  }
};

// GetRequestSignature - get the signature of a request
export const GetRequestSignature = async (
  headers: IRequestHeader[],
  headerName: string
): Promise<{
  signature: string;
  error: string | null;
}> => {
  if (headers.length === 0) {
    return {
      signature: "",
      error: null,
    };
  }

  const header = headers.find((header) => header.key === headerName);
  if (!header) {
    return {
      signature: "",
      error: `Header not found. Header Name - ${headerName}`,
    };
  }

  return {
    signature: header.value,
    error: null,
  };
};

// HandleRequest - handle a request
export const HandleRequest = async (
  request: NextRequest
): Promise<IRequest> => {
  const url = new URL(request.url);

  const ip = request.headers.get("X-Forwarded-For") || "unknown";

  let payload = "";
  payload = await request.text();

  const headers = Array.from(request.headers.entries()).map(([key, value]) => ({
    key,
    value,
  }));

  const params = Array.from(url.searchParams.entries()).map(([key, value]) => ({
    key,
    value,
  }));

  const record = {
    method: request.method,
    path: url.pathname + url.search,
    ip: ip,
    payload: payload,
    headers: headers as IRequestHeader[],
    params: params as IRequestParam[],
  };

  return record;
};
