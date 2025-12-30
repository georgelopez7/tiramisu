import { IRequestHeader, IRequestParam } from "@/domain/request";
import { AddRequest } from "@/service/request.service";
import { NextRequest, NextResponse } from "next/server";

async function handler(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const ip = request.headers.get("X-Forwarded-For") || "unknown";

    let payload = "";
    payload = await request.text();

    const headers = Array.from(request.headers.entries()).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    const params = Array.from(url.searchParams.entries()).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    console.log("URL: ", url.search);
    const record = {
      method: request.method,
      path: url.pathname + url.search,
      ip: ip,
      payload: payload,
      headers: headers as IRequestHeader[],
      params: params as IRequestParam[],
    };

    await AddRequest(record);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "Failed to handle request" },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
