import { USER_ACCESS_TOKEN_SECRET_KEY } from "../../config/config.service.js";
import { create, findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/models/user.model.js";
import { ConflictException, successesResponse } from "../../utils/index.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { fullName, email, password, phone, age, gender } = req.body;
  const checkUserExist = await findOne({
    model: UserModel,
    filter: { email },
  });
  if (checkUserExist) {
    return ConflictException({ message: "email already exists" });
  }
  const user = await create({
    model: UserModel,
    data: { fullName, email, password, phone, age, gender },
  });
  return successesResponse({ res, data: user, status: 201 });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: { email },
  });
  if (!user) {
    return ConflictException({ message: "email not exist" });
  }

  const token = jwt.sign(
    { userId: user._id },
    USER_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: 3600 },
  );
  user.token ="";
  user.token = token;
  user.save();
  return successesResponse({ res, data: token, status: 201 });
};

export const ConfirmEmail = async (req, res, next) => {};
