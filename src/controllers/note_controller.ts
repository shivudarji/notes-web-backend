import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";   // your user model
import { check } from "express-validator";
import t from '../lang/language'
import Note, { INote } from "../models/note";
import { isValidRequest } from "../common/request_validator";
import { response } from "../common/response";
import { cleanObject } from "../utils/helper/object_helper";
import { InternalServerError } from "../common/status";
import { setDefaultResultOrder } from "node:dns";

const addNoteValidation = [
     check('title')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'title' })),
      check('category')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'category' })),
        check('description')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'description' })),
   
]
const patchNoteValidation=[
    check('id')
        .notEmpty()
        .withMessage(t('required_validation', { key: 'id' })),
   
]
const deleteNoteValidation = [
  check('id')
    .notEmpty()
    .withMessage(t('required_validation', { key: 'id' }))
   
];
const addNote = async (req: Request, res: Response) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    } 
    // Create user
    const note = new Note({
      title,
      category,
      description,
      });
      await note.save();

    return res.status(201).json({ msg: "Notes Add successful", note });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", err });
  }
};
const patchNote = async (req: Request, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }

   try {
       const exists = await Note.findOne({
        category: req.body.category,
           _id: { $ne: req.params.id }
     });

      if (exists) {
           return res.status(409).json({
                  success: false,
                   message: "Another note already exists with this category"
             });
      }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
});
   
      if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
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


export const getNote = async (req: Request, res: Response) => {
  try {
    // const notes = await Note.find().sort({ createdAt: -1 });
 const notes = await Note.find()
      .populate("category", "name"); // only name

    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
   
  try {
    const { id } =  req.params;
    const noteData = await Note.findById(id);
    if (!noteData) {
      return res
        .status(InternalServerError)
        .json(response(false, t('technical_issue')));
    }

    //delete appointment
    await Note.deleteOne({ _id: id });

    return res.json(response(true, t('success'), Note));
  } catch (e: any) {
    return res.status(InternalServerError).json(response(false, e.message));
  }

};
export default {addNoteValidation,patchNoteValidation,deleteNoteValidation, addNote,patchNote,getNote,deleteNote };