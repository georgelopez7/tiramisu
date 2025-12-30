import { IRequest } from "@/domain/request";
import { AddRequest, GetRequests } from "@/service/request.service";
import crypto from "crypto";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./db";

const main = async () => {
  migrate(db, { migrationsFolder: "./drizzle" });

  const requestsInDB = await GetRequests();
  if (requestsInDB.length > 0) {
    console.log("🌱 Skipping seeding...");
    return;
  }

  const requests = [
    {
      method: "GET",
      path: "/test/get",
      ip: "127.0.0.1",
      payload: "",
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
        },
      ],
    },
    {
      method: "POST",
      path: "/test/post",
      ip: "127.0.0.1",
      payload: "{key: value}",
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
        },
        {
          key: "X-Test",
          value: "test",
        },
      ],
    },
  ] as IRequest[];

  for (const request of requests) {
    await AddRequest(request);
  }

  // WEBHOOK SETTINGS
  const secret = process.env.WEBHOOK_SECRET ?? "";
  const timestampHeader = process.env.TIMESTAMP_HEADER ?? "";
  const signatureHeader = process.env.SIGNATURE_HEADER ?? "";

  const timestamp = Math.floor(Date.now() / 1000);
  const payload = "{key: value}";
  if (secret && timestampHeader && signatureHeader) {
    console.log("🌱 Seeding webhook request...");

    const hasher = crypto.createHmac("sha256", secret);
    hasher.update(timestamp + "." + payload);
    const signature = hasher.digest("hex");

    const request = {
      method: "PATCH",
      path: "/test/patch/webhook",
      ip: "127.0.0.1",
      payload: payload,
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
        },
        {
          key: signatureHeader,
          value: signature,
        },
        {
          key: timestampHeader,
          value: timestamp,
        },
      ],
    } as IRequest;

    await AddRequest(request);
  }
};

main();
