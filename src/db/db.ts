import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const isTest = process.env.NODE_ENV === "test";
const path = isTest ? ":memory:" : "sqlite.db";

const sqlite = new Database(path);
export const db = drizzle({ client: sqlite });
