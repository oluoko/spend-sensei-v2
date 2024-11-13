import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import { dbUrl } from "../db.url.export";

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });
