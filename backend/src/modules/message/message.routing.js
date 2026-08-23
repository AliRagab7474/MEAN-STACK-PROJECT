import express from "express";
import { sendMessage } from "./message.controller.js";
import { authorization } from "../../middlewares/authorization.js";
import { authentication, } from "../../middlewares/authentication.middlewares.js";
import { RoleEnum } from "../../utils/index.js";
const router = express.Router();


router.post("/:receiverId/send-message",authentication(),sendMessage)
export default router