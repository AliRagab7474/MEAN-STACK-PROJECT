import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/index.js";
import { authenticateDB } from "./DB/index.js";
import { globalErrorHandling } from "./utils/index.js";
import { userRouter } from "./modules/user/index.js";
import { messageRouter } from "./modules/message/index.js";
import { reportRouter } from "./modules/report/index.js";

export const app = express();


let isDbConnected = false;

export const bootstrap = async () => {
  // Avoid reconnecting on every serverless cold start
  if (isDbConnected) return app;

  //DB connection
  await authenticateDB();
  isDbConnected = true;

  //global middleware
  app.use(express.json());

  app.use(
    cors({
      origin: ["https://sarhne-project.vercel.app", "http://localhost:4200"],
      credentials: true,
    })
  );

  //global routing
  app.get("/", (req, res) => {
    return res.json({ message: "landing page" });
  });

  //routing
  app.use("/auth", authRouter);
  app.use("/user", userRouter); //user profile
  app.use("/message", messageRouter);
  app.use("/report", reportRouter);

  //global error handling
  app.use(globalErrorHandling);

  //dummy routing
  app.get("/{*path}", (req, res) => {
    return res.status(404).json({ message: "invalid routing" });
  });

  return app;
};

export default bootstrap;

