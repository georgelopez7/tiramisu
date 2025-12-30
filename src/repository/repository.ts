import { db } from "../db/db";
import { headersTable, requestParamsTable, requestsTable } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
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

    if (request.params && request.params.length > 0) {
      await tx.insert(requestParamsTable).values(
        request.params.map((param) => ({
          key: param.key,
          value: param.value,
          request_id: requestID,
        }))
      );
    }

    return requestID;
  });
};

// GetRequests - get all requests from database
export const GetRequests = async (): Promise<IRequest[]> => {
  return db.transaction(async (tx) => {
    const requests = await tx
      .select({
        id: requestsTable.id,
        method: requestsTable.method,
        path: requestsTable.path,
        ip: requestsTable.ip,
        payload: requestsTable.payload,
        created_at: requestsTable.created_at,
      })
      .from(requestsTable);

    if (requests.length === 0) {
      return [];
    }

    const requestIDs = requests.map((r) => r.id);

    const headers = await tx
      .select({
        id: headersTable.id,
        key: headersTable.key,
        value: headersTable.value,
        request_id: headersTable.request_id,
      })
      .from(headersTable)
      .where(inArray(headersTable.request_id, requestIDs));

    const params = await tx
      .select({
        id: requestParamsTable.id,
        key: requestParamsTable.key,
        value: requestParamsTable.value,
        request_id: requestParamsTable.request_id,
      })
      .from(requestParamsTable)
      .where(inArray(requestParamsTable.request_id, requestIDs));

    const headersByRequest = new Map<number, IRequest["headers"]>();
    const paramsByRequest = new Map<number, IRequest["params"]>();

    for (const header of headers) {
      const requestID = header.request_id!;
      if (!headersByRequest.has(requestID)) {
        headersByRequest.set(requestID, []);
      }

      headersByRequest.get(requestID)!.push({
        id: header.id,
        key: header.key,
        value: header.value,
        request_id: requestID,
      });
    }

    for (const param of params) {
      const requestID = param.request_id!;
      if (!paramsByRequest.has(requestID)) {
        paramsByRequest.set(requestID, []);
      }
      paramsByRequest.get(requestID)!.push({
        id: param.id,
        key: param.key,
        value: param.value,
        request_id: requestID,
      });
    }

    return requests.map((request) => ({
      ...request,
      headers: headersByRequest.get(request.id) ?? [],
      params: paramsByRequest.get(request.id) ?? [],
    }));
  });
};

// GetRequestByID - get a request with its headers by id
export const GetRequestByID = async (id: number): Promise<IRequest | null> => {
  return db.transaction(async (tx) => {
    const [request] = await tx
      .select({
        id: requestsTable.id,
        method: requestsTable.method,
        path: requestsTable.path,
        ip: requestsTable.ip,
        payload: requestsTable.payload,
        created_at: requestsTable.created_at,
      })
      .from(requestsTable)
      .where(eq(requestsTable.id, id))
      .limit(1);

    if (!request) {
      return null;
    }

    const headers = await tx
      .select({
        id: headersTable.id,
        key: headersTable.key,
        value: headersTable.value,
        request_id: headersTable.request_id,
      })
      .from(headersTable)
      .where(eq(headersTable.request_id, id));

    const params = await tx
      .select({
        id: requestParamsTable.id,
        key: requestParamsTable.key,
        value: requestParamsTable.value,
        request_id: requestParamsTable.request_id,
      })
      .from(requestParamsTable)
      .where(eq(requestParamsTable.request_id, id));

    return {
      ...request,
      headers: headers.map((h) => ({
        ...h,
        request_id: id,
      })),
      params: params.map((p) => ({
        ...p,
        request_id: id,
      })),
    };
  });
};

// ResetRequestsTable - reset the requests table
export const ResetRequestsTable = async () => {
  await db.delete(requestsTable);
};
