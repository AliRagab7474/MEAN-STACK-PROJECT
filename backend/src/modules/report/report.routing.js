import express from "express";
import { authentication, authorization } from "../../middlewares/index.js";
import { patchReport, reportMessage,getReports,getReport } from "./report.controller.js";
import { RoleEnum } from "../../utils/index.js";


const router = express.Router();


router.post("/:messageId/report-message",authentication(),reportMessage)
router.patch("/:reportId/report-patch",authentication(),authorization(RoleEnum.Admin),patchReport)
router.get("/all-reports",authentication(),authorization(RoleEnum.Admin),getReports)
router.get("/:reportId/get-report-details",authentication(),authorization(RoleEnum.Admin),getReport)
export default router