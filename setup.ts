import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "@/db/db";

migrate(db, { migrationsFolder: "./drizzle" });
