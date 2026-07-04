import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user"],
    },
  },
  {
    timestamps: true,
  }
);

userschema.pre("save", async function () {
    if (!this.isModified("password")) {
      return ;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

const UserModel = model("User", userschema);

export default UserModel;