import express from "express"
import { ConfirmEmail, forgetPassword, login, resetPassword, signup } from "./auth.controller.js"
import { validation } from "../../middlewares/validation.middleware.js"
import { loginSchema, signupSchema } from "./auth.validation.js"


const router =express()

router.post("/signup",validation(signupSchema),signup)
router.post("/login",validation(loginSchema),login)
router.patch("/confirm-email",ConfirmEmail)
router.post("/forget-password",forgetPassword)
router.patch("/reset-password",resetPassword)

export default router


