import { dbUrl } from "./db.url.export";

export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: dbUrl,
    connectionStrings: dbUrl,
  },
};
