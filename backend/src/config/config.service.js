import { config } from "dotenv";
import { existsSync } from "fs";

export const NODE_ENV = process.env.NODE_ENV || "development";

// Load .env file only in local development (won't exist on Vercel)
const envPaths = {
  development: "./src/config/.env.development",
};
const envPath = envPaths[NODE_ENV];
if (envPath && existsSync(envPath)) {
  config({ path: envPath });
}

export const port = process.env.PORT ?? 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;

export const USER_ACCESS_TOKEN_SECRET_KEY = process.env.USER_ACCESS_TOKEN_SECRET_KEY;
export const ADMIN_ACCESS_TOKEN_SECRET_KEY  = process.env.ADMIN_ACCESS_TOKEN_SECRET_KEY ;

export const APP_EMAIL  = process.env.APP_EMAIL ;
export const APP_EMAIL_PASSWORD  = process.env.APP_EMAIL_PASSWORD ;

export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10')
export const ENC_IV_LENGTH = parseInt(process.env.ENC_IV_LENGTH ?? '16')
export const ENC_KEY = process.env.ENC_KEY 