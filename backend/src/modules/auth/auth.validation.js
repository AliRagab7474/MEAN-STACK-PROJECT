import joi from "joi";
import { generalValidationFields } from "../../utils/index.js";


export const loginSchema = {
    body:joi.object().keys({
        email:generalValidationFields.email.required(),
        password:generalValidationFields.password.required()
    })
}
export const signupSchema = {
    body:loginSchema.body.append().keys({
        fullName:generalValidationFields.fullName.required(),
        phone:generalValidationFields.phone.required(),
        age:generalValidationFields.age.required(),
        gender:generalValidationFields.gender.required(),
        confirmPassword:generalValidationFields.confirmPassword("password").required()
    })
}