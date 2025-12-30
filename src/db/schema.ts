import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const requestsTable = sqliteTable("requests", {
  id: int().primaryKey({ autoIncrement: true }),
  method: text().notNull(),
  path: text().notNull(),
  ip: text().notNull(),
  payload: text().notNull(),
  created_at: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const headersTable = sqliteTable("headers", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  value: text().notNull(),
  request_id: int().references(() => requestsTable.id, { onDelete: "cascade" }),
});

export const requestParamsTable = sqliteTable("request_params", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  value: text().notNull(),
  request_id: int().references(() => requestsTable.id, { onDelete: "cascade" }),
});
