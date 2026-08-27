import {
  ADMIN_ACCESS_TOKEN_SECRET_KEY,
  USER_ACCESS_TOKEN_SECRET_KEY,
} from "../../config/config.service.js";
import { create, findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/models/user.model.js";
import { sendEmail } from "../../utils/email/index.js";
import { emailTemplate } from "../../utils/email/index.js";
import {
  BadRequestException,
  catchAsync,
  compareHash,
  ConflictException,
  createNumberOtp,
  Encrypt,
  generateHash,
  NotFoundException,
  RoleEnum,
  successesResponse,
} from "../../utils/index.js";
import jwt from "jsonwebtoken";

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, phone, age, gender } = req.body;
  const checkUserExist = await findOne({
    model: UserModel,
    filter: { email },
  });
  if (checkUserExist) {
    return ConflictException({ message: "email already exists" });
  }

  let otp = createNumberOtp();

  const user = await create({
    model: UserModel,
    data: {
      fullName,
      email,
      password: await generateHash(password),
      phone: await Encrypt(phone),
      age,
      gender,
      otp: await generateHash(String(otp)),
    },
  });

  console.log(`\n========================================`);
  console.log(`🔑 OTP for ${email} is: ${otp}`);
  console.log(`========================================\n`);

  try {
    await sendEmail({
      to: email,
      subject: "Confirm Email",
      html: emailTemplate({ code: otp, title: "Confirm Email" }),
    });
  } catch (error) {
    console.warn("Failed to send email (check .env.development credentials), but continuing registration.");
  }

  return successesResponse({ res, data: user, status: 201 });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: { email },
    select: "+password +ConfirmEmail"
  });
  if (!user) {
    return ConflictException({ message: "email not exist" });
  }

  if (!user.ConfirmEmail) {
    return BadRequestException({ res, message: "email is not confirmed" });
  }
    const passwordMatch = await compareHash(password, user.password)

  if (passwordMatch == false) {
    return BadRequestException({ res, message: "wrong credentials" });
  }

  if (user.role == RoleEnum.Admin) {
    const token = jwt.sign(
      { userId: user._id },
      ADMIN_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: 14400,
      },
    );
    return successesResponse({ res, data: token, status: 201 });
  }

  const token = jwt.sign({ userId: user._id }, USER_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: 3600,
  });
  user.token = "";
  user.token = token;
  user.save();

  return successesResponse({ res, data: token, status: 201 });
});

export const ConfirmEmail = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: { email },
    select: "+otp +ConfirmEmail"
  });

  if (!user) {
    return NotFoundException({ message: "email not found" });
  }

  if (user.ConfirmEmail == true) {
    return ConflictException({ message: "email already confirmed" });
  }

  const isMatch = await compareHash(otp, user.otp);
  if (!isMatch) {
    return BadRequestException({ res, message: "invalid OTP" });
  }
  user.otp = "";
  user.ConfirmEmail = true;
  user.save();
  return successesResponse({
    res,
    message: "email confirmed , you can login now",
  });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: { email },
    select: "+otp"
  });

  if (!user) {
    return NotFoundException({ res, message: "email not found" });
  }

  let otp = createNumberOtp();
  
  console.log(`\n========================================`);
  console.log(`🔑 OTP for ${email} is: ${otp}`);
  console.log(`========================================\n`);

  try {
    await sendEmail({
      to: email,
      subject: "Forget Password",
      html: emailTemplate({ code: otp, title: "Forget Password" }),
    });
  } catch (error) {
    console.warn("Failed to send email (check .env.development credentials), but continuing.");
  }
  user.otp = await generateHash(String(otp));
  user.save()

  return successesResponse({
    res,
    message: "otp sent",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { email,otp ,password,confirmPassword } = req.body;

  const user = await findOne({
    model:UserModel,
    filter:{email},
    select:"+otp +password"
  })

  if (!user) {
    return NotFoundException({ res, message: "email not found" });
  }

  if (password !=confirmPassword) {
    return BadRequestException({res,message:"password and confirmPassword not identical"})
  }
  const passwordMatch = await compareHash(password, user.password)
    if (passwordMatch == true) {
    return ConflictException({ res, message: "can not use the same password" });
  }
    const isMatch = await compareHash(otp, user.otp);
  if (!isMatch) {
    return BadRequestException({ res, message: "invalid OTP" });
  }

  user.password = await generateHash(password)
  user.otp = ""
  user.save()

  return successesResponse({
    res,
    message: "done password reset",
  });
});


