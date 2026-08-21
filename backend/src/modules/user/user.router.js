import express from "express";
import { getProfile,getAllUsers,deleteProfile, deleteProfile } from "./user.controller.js";
// import { auth } from "../../middlewares/auth.js";
import { allowTo } from "../../middlewares/allowTo.js";
const router = express.Router();
router.get("/profile",auth,getProfile)
router.delete("/profile",auth,deleteProfile)
router.get("/",auth,allowTo("admin"),getAllUsers)
export default router