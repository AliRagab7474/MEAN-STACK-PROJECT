import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "../config/config.service.js";
export const authenticateDB = async () => {
  const databaseConnection = await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
  });
  console.log(`Database connected successfully`);
  return databaseConnection;
};
