"use server";

import { IRequest, IRequestHeader } from "@/domain/request";
import {
  AddRequest as AddRequestRepo,
  GetRequests as GetRequestsRepo,
  GetRequestByID as GetRequestByIDRepo,
} from "../repository/repository";

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
export const GetRequestTimestamp = (
  headers: IRequestHeader[],
  headerName: string
): {
  timestamp: number;
  error: string | null;
} => {
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

export const GetRequestSignature = (
  headers: IRequestHeader[],
  headerName: string
): {
  signature: string;
  error: string | null;
} => {
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
