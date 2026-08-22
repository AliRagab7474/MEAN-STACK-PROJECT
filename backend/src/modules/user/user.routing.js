import express from "express";
import { getProfile,getAllUsers, deleteProfile, blockUser, unBlockUser, shareProfile, getSharedProfile } from "./user.controller.js";
import { authorization } from "../../middlewares/authorization.js";
import { authentication, } from "../../middlewares/authentication.middlewares.js";
import { RoleEnum } from "../../utils/index.js";
const router = express.Router();


router.get("/profile",authentication(),getProfile)
router.delete("/deleteProfile",authentication(),deleteProfile)

router.get("/shareProfile",authentication(),shareProfile)
router.get("/:email/shareProfile",getSharedProfile)

router.get("/getAllUsers",authentication(),authorization(RoleEnum.Admin),getAllUsers)
router.patch("/:id/blockUser",authentication(),authorization(RoleEnum.Admin),blockUser)
router.patch("/:id/unBlockUser",authentication(),authorization(RoleEnum.Admin),unBlockUser)
export default router