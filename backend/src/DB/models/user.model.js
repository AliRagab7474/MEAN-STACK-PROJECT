import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [2, "Name must be at least 2 characters long"],
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minLength: [2, "Name must be at least 2 characters long"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        select: false,
    },
    status:{
        type: String,
        enum: ["active","blocked"],
        default: "inactive",
        select: false,
    },
    confirmEmail: Date,
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
  }
)

userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstname +  " " + this.lastname;
  });

export const User = mongoose.models.User || mongoose.model("User", userSchema);