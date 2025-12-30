import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const path = process.env.DATABASE_PATH ?? "./sqlite.db";
const sqlite = new Database(path);
export const db = drizzle({ client: sqlite });
