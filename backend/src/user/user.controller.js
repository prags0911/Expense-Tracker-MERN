import UserModel from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";

export const createUser = async (req, res) => {
    try {
        const { fullname, mobile, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        await sendMail(
            email,
            "Expense Tracker OTP Verification",
            `Your OTP is ${otp}`
        );

        const user = new UserModel({
            fullname,
            mobile,
            email,
            password,
            otp,
            otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
            isVerified: false
        });

        await user.save();

        res.status(201).json({
            message: "OTP sent successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createToken = async (user) => {
    const payload = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    };

    const token = await jwt.sign(
        payload,
        process.env.AUTH_SECRET,
        { expiresIn: "1d" }
    );

    return token;
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                message: "Please verify your email first"
            });
        }

        const isLogged = await bcrypt.compare(password, user.password);

        if (!isLogged) {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }

        const token = await createToken(user);

        res.json({
            message: "Login Success",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({
            message: "Account verified successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
export const forgotPassword = async (req, res) => {
    try {
        console.log("Step 1");

        const { email } = req.body;
        console.log("Step 2:", email);

        const user = await UserModel.findOne({ email });
        console.log("Step 3");

        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Step 4");

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await user.save();
        console.log("Step 5");

        await sendMail(
            email,
            "Expense Tracker Password Reset OTP",
            `Your OTP is ${otp}`
        );

        console.log("Step 6");

        return res.json({
            message: "OTP sent successfully"
        });

    } catch (err) {
        console.log("ERROR:");
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {

        const { email, otp, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        user.password = password;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({
            message: "Password reset successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};