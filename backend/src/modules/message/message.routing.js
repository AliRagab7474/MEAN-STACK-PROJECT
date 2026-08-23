import express from "express";
import { deleteMessage, getMessageById, getMessageReceived, getMessageSended, sendMessage } from "./message.controller.js";
import { authorization } from "../../middlewares/authorization.js";
import { authentication, } from "../../middlewares/authentication.middlewares.js";
import { RoleEnum } from "../../utils/index.js";
const router = express.Router();


router.post("/:receiverId/send-message",authentication(),sendMessage)
router.get("/received-messages",authentication(),getMessageReceived)
router.get("/sended-messages",authentication(),getMessageSended)
router.delete("/:messageId/delete-message",authentication(),deleteMessage)
router.get("/:messageId",authentication(),authorization(RoleEnum.Admin),getMessageById)

export default router