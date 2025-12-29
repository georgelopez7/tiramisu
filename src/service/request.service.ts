"use server";

import { IRequest } from "@/domain/request";
import {
  AddRequest as AddRequestRepo,
  GetRequests as GetRequestsRepo,
} from "../repository/repository";

// AddRequest - add a new request
export const AddRequest = async (request: IRequest): Promise<IRequest> => {
  const result = await AddRequestRepo(request);
  return result;
};

// GetRequests - get all requests
export const GetRequests = async (): Promise<IRequest[]> => {
  const result = await GetRequestsRepo();
  return result;
};
