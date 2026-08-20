import { config } from "dotenv";
export const NODE_ENV = process.env.NODE_ENV || "development";
const envPaths = {
  development: "./src/config/.env.development",
};
config({ path: envPaths[NODE_ENV] });

export const port = process.env.PORT ?? 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;
