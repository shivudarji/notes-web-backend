import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";   // your user model
import { check } from "express-validator";
import t from '../lang/language'
import { isValidRequest } from "../common/request_validator";
import Profile from "../models/profile";

// ========================
//        SIGNUP
// ========================
const signupValidation = [
     check('firstName')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'firstName' })),
      check('lastName')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'lastName' })),
        check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

   check('password')
        .if((value, { req }) => req.body.password)
        .notEmpty()
        .withMessage(t('required_validation', { key: 'new_password' }))
        .isLength({ min: 8 })
        .withMessage(
          t('must_be_grater_then', { key: 'new_password', val: '8' })
        )
        .matches(/\d/)
        .withMessage(t('password_contain_number'))
        .matches(/[a-zA-Z]/)
        .withMessage(t('password_contain_letter'))
        .matches(/[@$!%*?&]/)
        .withMessage(t('password_contain_special_character')),

      check('confirm_password')
        .if((value, { req }) => req.body.cpswd)
        .notEmpty()
        .withMessage(t('required_validation', { key: 'confirm_password' }))
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error(t('passwords_do_not_match'));
          }
          return true;
        }),
   
]
const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, cpswd } = req.body;
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !cpswd) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Password match check
    if (password !== cpswd) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Check if email exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      
      firstName,
      lastName,
      email,
      password: hashed,
      cpswd: hashed, // OPTIONAL: can remove if not storing
    });
        await user.save();

       // 2️⃣ Create empty profile
     await Profile.create({
         user: user._id
      });


    return res.status(201).json({ msg: "Signup successful", user });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", err });
  }
};
export default { signupValidation, signup};