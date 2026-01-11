import { check } from "express-validator";
import { isValidRequest } from "../common/request_validator";
import User from "../models/user";
import { t } from "i18next";
import Profile, { IProfile } from "../models/profile";
import { InternalServerError } from "../common/status";
import { response } from "../common/response";
import { Request, Response } from "express";

import { AuthRequest } from "../types/request";
import { Types } from "mongoose";
const patchProfileValidation=[
    check('id')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'id' })),
   
]
const patchProfile = async (req: AuthRequest, res: Response)  => {
     // 🔐 Auth check
   try
   {
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = new Types.ObjectId(req.user.id);

    // 🧾 Data from frontend
    const {
      firstName,
      lastName,
      gender,
      country,
      state,
      dob,
    event_time,
    mobile,
      hobbies,
      // image
    } = req.body;

    // ✅ Update or Create profile (UPSERT)
    const profile = await Profile.findOneAndUpdate(
      { user: userId },              // find by userId
      {
        $set: {
          firstName,
          lastName,
          gender,
          country,
          state,
          dob,
          mobile,
          event_time,
          hobbies,
          // image
        }
      },
      {
        new: true,              // return updated document
        upsert: true            // create if not exists
      }
    ) .populate("user", "email") // get user email only
    .lean();

       if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Merge names into user object for frontend
    const profileData = {
      ...profile,
      user: {
        ...profile.user,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
    };
  
    return res.status(200).json({
       success: true,
      message: "Profile updated successfully",
      data: profileData,
    });
  
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProfileData = async (req:AuthRequest, res:Response) => {
if (!isValidRequest(req, res)) {
    return;
  }
  try {
     if (!req.user) return res.status(401).json({ message: "Unauthorized" });
     const userId = new Types.ObjectId(req.user.id);

    // ✅ find profile by userId
    const profile = await Profile.findOne({ user: userId })
      .populate("user", "firstName lastName email");
if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (e: any) {
    return res.status(InternalServerError).json(response(false, e.message));
  }
};

export default { patchProfileValidation , getProfileData,patchProfile};