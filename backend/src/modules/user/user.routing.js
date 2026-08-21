import express from "express"
import { authentication } from "../../middlewares/index.js"
import { profile } from "./user.controller.js"

const router = express.Router()

router.get("/profile", authentication("UserAccess"), profile)

export default router


