import { db } from "../db/db";
import { headersTable, requestsTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { IRequest } from "@/domain/request";

// AddRequest - add a new request and its headers in a single transaction
export const AddRequest = async (request: IRequest): Promise<number> => {
  return db.transaction(async (tx) => {
    const inserted = await tx
      .insert(requestsTable)
      .values({
        method: request.method,
        path: request.path,
        ip: request.ip,
        payload: request.payload,
      })
      .returning({ id: requestsTable.id });

    const requestID = inserted[0].id;

    if (request.headers && request.headers.length > 0) {
      await tx.insert(headersTable).values(
        request.headers.map((header) => ({
          key: header.key,
          value: header.value,
          request_id: requestID,
        }))
      );
    }

    return requestID;
  });
};

// GetRequests - get all requests from database
export const GetRequests = async (): Promise<IRequest[]> => {
  const data = await db
    .select({
      requestID: requestsTable.id,
      method: requestsTable.method,
      path: requestsTable.path,
      ip: requestsTable.ip,
      payload: requestsTable.payload,
      headerID: headersTable.id,
      key: headersTable.key,
      value: headersTable.value,
    })
    .from(requestsTable)
    .leftJoin(headersTable, eq(requestsTable.id, headersTable.request_id));

  const requestMap = new Map<number, IRequest>();
  data.forEach((row) => {
    const requestID = row.requestID;

    if (!requestMap.has(requestID)) {
      requestMap.set(requestID, {
        id: requestID,
        method: row.method,
        path: row.path,
        ip: row.ip,
        payload: row.payload,
        headers: [],
      });
    }

    const request = requestMap.get(requestID)!;
    if (row.headerID) {
      request.headers!.push({
        key: row.key!,
        value: row.value!,
        request_id: requestID,
      });
    }
  });

  return Array.from(requestMap.values());
};

// GetRequestByID - get a request with its headers by id
export const GetRequestByID = async (id: number): Promise<IRequest | null> => {
  const data = await db
    .select({
      requestID: requestsTable.id,
      method: requestsTable.method,
      path: requestsTable.path,
      ip: requestsTable.ip,
      payload: requestsTable.payload,
      headerID: headersTable.id,
      key: headersTable.key,
      value: headersTable.value,
    })
    .from(requestsTable)
    .leftJoin(headersTable, eq(requestsTable.id, headersTable.request_id))
    .where(eq(requestsTable.id, id));

  if (data.length === 0) {
    return null;
  }

  const request: IRequest = {
    id: data[0].requestID,
    method: data[0].method,
    path: data[0].path,
    ip: data[0].ip,
    payload: data[0].payload,
    headers: [],
  };

  data.forEach((row) => {
    if (row.headerID) {
      request.headers!.push({
        id: row.headerID,
        key: row.key!,
        value: row.value!,
        request_id: id,
      });
    }
  });

  return request;
};

// ResetRequestsTable - reset the requests table
export const ResetRequestsTable = async () => {
  await db.delete(requestsTable);
};
