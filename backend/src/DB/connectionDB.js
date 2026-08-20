import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config.service.js";

export const authenticateDB = async () => {
    try {
        const databaseConnection = await mongoose.connect(MONGODB_URI);
        console.log(`database connected`);
    } catch (error) {
        console.log(`failed to connect on db ${error}`);
    }
};