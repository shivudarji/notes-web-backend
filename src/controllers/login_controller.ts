import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";   // your user model

// ========================
//        LOGIN
// ========================
const JWT_SECRET = process.env.JWT_SECRET || "trackivo_secret";

// validation/loginValidation.ts
import { check } from "express-validator";
import Login from "../models/login";
const loginValidation = [
  check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  check("password")
    .notEmpty().withMessage("Password is required"),

  check("browserName")
    .notEmpty().withMessage("BroswerName is required"),

  check("deviceId")
    .notEmpty().withMessage("Device ID is required"),

];
const login = async (req: Request, res: Response) => {
  try {
    const { email, password,browserName,deviceId } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ msg: "Email & password required" });
    }

    // Find user
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
  
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },   // removed role
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    
  //  const data = await Login.create({
  //   //   user_id: user._id,
  //     email,
  //     password,
  //     browserName,
  //     deviceId,
  //   });
  //   console.warn('data',data)
  
    return res.json({
        status:true,
      msg: "Login successful",
      token,
      data:{user},
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", err });
  }
};
export default { login,loginValidation};