import express from "express";
import { authentication, authorization } from "../../middlewares/index.js";
import { reportMessage } from "./report.controller.js";
import { RoleEnum } from "../../utils/index.js";

const router = express.Router();


router.post("/:messageId/report-message",authentication(),reportMessage)
router.post("/reportId/report-patch",authentication(),authorization(RoleEnum.Admin),reportMessage)

export default router