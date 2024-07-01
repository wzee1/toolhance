import { defineConfig } from "drizzle-kit"
export default defineConfig({
  schema: "./lib/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  //driver: "pg",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
})