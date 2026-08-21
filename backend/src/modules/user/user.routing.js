import express from "express";
import { getProfile,getAllUsers, deleteProfile } from "./user.controller.js";
import { authorization } from "../../middlewares/authorization.js";
import { authentication, } from "../../middlewares/authentication.middlewares.js";
import { RoleEnum } from "../../utils/index.js";
const router = express.Router();
router.get("/profile",authentication(),getProfile)
router.delete("/deleteProfile",authentication(),deleteProfile)
router.get("/getAllUsers",authentication(),authorization(RoleEnum.Admin),getAllUsers)
export default router