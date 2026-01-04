import { AddRequest, HandleRequest } from "@/service/request.service";
import { NextRequest, NextResponse } from "next/server";

async function handler(request: NextRequest) {
  try {
    const req = await HandleRequest(request);
    await AddRequest(req);

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
