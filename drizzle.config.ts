import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./apps/api/src/schemas/"],
  dialect: "postgresql",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
