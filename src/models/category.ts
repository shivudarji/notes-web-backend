//Users
import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IRole } from './role';

export interface ICategory extends Document {
//   id: string;
   name: string;
  description: string;
  status?: boolean; 
  created_at?: Date;
  deleted_at?: Date;

  // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;
}

// 2. Create a Schema corresponding to the document interface.
const categorySchema = new Schema<ICategory>({
//   id: {
//     type: String,
//     required: true,
//     unique: true,
//   },
  name: {
      type: String,
       required: true,
      unique: true,  
    },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const Category = model<ICategory>('Category', categorySchema);
export default Category;
