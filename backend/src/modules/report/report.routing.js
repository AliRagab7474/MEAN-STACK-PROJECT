import express from "express";
import { authentication, authorization } from "../../middlewares/index.js";
import { patchReport, reportMessage } from "./report.controller.js";
import { RoleEnum } from "../../utils/index.js";

const router = express.Router();


router.post("/:messageId/report-message",authentication(),reportMessage)
router.patch("/:reportId/report-patch",authentication(),authorization(RoleEnum.Admin),patchReport)

export default router