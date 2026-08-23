import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/index.js";
import { authenticateDB } from "./DB/index.js";
import { globalErrorHandling } from "./utils/index.js";
import { userRouter } from "./modules/user/index.js";
import { messageRouter } from "./modules/message/index.js";
import { reportRouter } from "./modules/report/index.js";

const app = express();
const port = 3000;

const bootstrap = async () => {
  //global middleware
  app.use(express.json());


  app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
  //DB connection
  await authenticateDB();

  //global routing
  app.get("/", (req, res, next) => {
    return res.json({ message: "landing page" });
  });

  //routing
  app.use("/auth",authRouter)
  app.use("/user",userRouter) //user profile
  app.use("/message",messageRouter)
  app.use("/report",reportRouter)

  //global error handling
  app.use(globalErrorHandling);

  //dummy routing
  app.get("/{*path}", (req, res, next) => {
    return res.status(404).json({ message: "invalid routing" });
  });

  //listener
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

export default bootstrap;
