import joi from "joi";
import mongoose, { Types } from "mongoose";

export const generalValidationFields = {
  email: joi
    .string()
    .email()
    .pattern(
      new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ),

  password: joi
    .string()
    .pattern(RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*.\W).{8,16}$/)),

  fullName: joi.string().pattern(RegExp(/^[A-z]{1,24}\s[A-z]{1,24}$/)),
  
  phone: joi.string().pattern(RegExp(/^(00|\+20|01)(0|1|2|5)\d{8}$/)),
  
  otp: joi.string().pattern(RegExp(/^\d{6}$/)),
  
  confirmPassword: function (path = "password") {
    return joi.string().valid(joi.ref(path));
  },

  age: joi.number().min(18).max(60),
  
  gender: joi.string().valid("male", "female"),

  id: joi.string().custom((id, helper) => {
    return Types.ObjectId.isValid(id)
      ? true
      : helper.message("invalid object id");
  }),

};
