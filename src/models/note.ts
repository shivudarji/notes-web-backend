//Users
import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IRole } from './role';

export interface INote extends Document {
//   id: string;
  title: string;
   category:  Types.ObjectId;
  description: string;
  status?: boolean; 
  created_at?: Date;
  deleted_at?: Date;

  // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;
}

// 2. Create a Schema corresponding to the document interface.
const noteSchema = new Schema<INote>({
//   id: {
//     type: String,
//     required: true,
//     unique: true,
//   },
  title: {
    type: String,
    trim: true,
  },
  category: {
     type: Schema.Types.ObjectId,
      // required: true,
      ref: "Category",
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

const Note = model<INote>('Note', noteSchema);
export default Note;
