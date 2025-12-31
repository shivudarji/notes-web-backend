import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";   // your user model
import { check } from "express-validator";
import t from '../lang/language'
import Note from "../models/note";
import Category from "../models/category";
import { isValidRequest } from "../common/request_validator";
import { InternalServerError } from "../common/status";
import { response } from "../common/response";

// ========================
//        SIGNUP
// ========================
const addCategoryValidation = [
       check('category')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'category' })),
        check('description')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'description' })),
   
]
const patchCategoryValidation=[
    check('id')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'id' })),
   
]
// const deleteCategoryValidation = [
//   check('id')
//     .notEmpty()
//     .withMessage(t('required_validation', { key: 'id' }))
   
// ];
const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    // Validate required fields
    if ( !name || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

 
    // Create user
    const category = new Category({
     name,
      description
      });
     console.warn('category',category)
    await category.save();

    return res.status(201).json({ msg: "Add Category successful", category });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", err });
  }
};
// controllers/categoryController.js

// ➤ Get All Categories
export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
  }
};
const patchCategory = async (req: Request, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  console.warn('category id',req.params.id)

   try {
    //    const exists = await Category.findOne({
    //     category: req.body.category,
    //        _id: { $ne: req.params.id }
    //  });

    //   if (exists) {
    //        return res.status(409).json({
    //               success: false,
    //                message: "Another note already exists with this category"
    //          });
    //   }

     const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true
       });
   
     console.warn('Category',updatedCategory)

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });

    
  } catch (e: any) {
     res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
    // return res.status(InternalServerError).json(response(false, e.message));
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  console.warn('req bdy',req.query)
  if (!isValidRequest(req, res)) {
    return;
  }
   
  try {
    const { categoryId  } =  req.query;
    console.warn('id',categoryId )
    const categoryData = await Category.findById(categoryId );
    if (!categoryData) {
      return res
        .status(InternalServerError)
        .json(response(false, t('technical_issue')));
    }

    //delete appointment
    await Category.deleteOne({ _id: categoryId  });
    res.status(200).json({
       message: 'Deleted successfully'
    });
   }catch (e: any) {
    return res.status(InternalServerError).json(response(false, e.message));
   }

};
export default {addCategoryValidation,patchCategoryValidation, addCategory,getCategory,patchCategory,deleteCategory};