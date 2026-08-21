import { findById } from "../DB/database.repository.js";
import { UserModel } from "../DB/models/user.model.js";
import { UnauthorizedException } from "../utils/index.js";
import { ADMIN_ACCESS_TOKEN_SECRET_KEY, USER_ACCESS_TOKEN_SECRET_KEY,  } from "../config/config.service.js";
import jwt from "jsonwebtoken"

// Map token type string to its secret key
const tokenSecrets = {
  "UserAccess": USER_ACCESS_TOKEN_SECRET_KEY,
  "AdminAccess": ADMIN_ACCESS_TOKEN_SECRET_KEY,
};

export const authentication = (tokenType = "UserAccess") => {
  return async (req, res, next) => {
    const [ schema, credentials ] = req.headers?.authorization?.split(" ") || [];
      
    if (!schema || !credentials) {
      throw UnauthorizedException({
        message: "missing authentication or missing approach",
      });
    }
        const decoded = jwt.verify(credentials, tokenSecrets[tokenType]);

        const user = await findById({
          model: UserModel,
          id: decoded.userId,
        });

        if (!user) {
          throw UnauthorizedException({ message: "user not found" });
        }

        req.user = user;
        req.decoded = decoded;
        next();
  };
};

