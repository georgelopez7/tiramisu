import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "@/db/db";
import path from "path";

migrate(db, {
  migrationsFolder: path.resolve("./drizzle"),
});
