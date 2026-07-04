import { Router } from "express";
import {
  createUser,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "./user.controller.js";

import { sendMail } from "../utils/sendMail.js";
import verifyToken from "../middleware/auth.middleware.js";
const userRouter = Router();

// Signup
userRouter.post("/signup", createUser);

// Verify Signup OTP
userRouter.post("/verify-otp", verifyOtp);

// Login
userRouter.post("/login", login);

userRouter.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// Forgot Password
 userRouter.post("/forgot-password", forgotPassword);

// Reset Password
userRouter.post("/reset-password", resetPassword);

// Test Mail
userRouter.get("/test-mail", async (req, res) => {
  try {
    await sendMail(
      "pragyasingh35524@gmail.com",
      "Expense Tracker Test",
      "Nodemailer is working successfully!"
    );

    res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default userRouter;