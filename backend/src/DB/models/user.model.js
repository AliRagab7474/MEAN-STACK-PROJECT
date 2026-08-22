import mongoose from "mongoose";
import { GenderEnum, RoleEnum, StatusEnum } from "../../utils/index.js";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minlength: [
        2,
        "FirstName must be more than 2 char you have entered {VALUE}",
      ],
      maxlength: 25,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      maxlength: 25,
      trim: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    Gender: {
      type: String,
      enum: Object.values(GenderEnum),
      default: GenderEnum.Male,
    },
    age: {
      type: Number,
      minlength: [15, "age can not be under 15"],
      maxlength: [60, "age can not be over 60"],
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.User,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.Active,
    },
    token: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: "",
    },

    ConfirmEmail: {type:Boolean,default:false},
    ChangeCredentialsTime: Date,
  },
  {
    collection: "App_Users",
    timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    autoIndex: true,
  },
);

userSchema
  .virtual("fullName")
  .set(function (value) {
    const [FirstName, LastName] = value.split(" ");
    this.FirstName = FirstName;
    this.LastName = LastName;
  })
  .get(function () {
    return this.FirstName + " " + this.LastName;
  });

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
