//Users
import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IRole } from './role';

export interface ILogin extends Document {

    email: string;
   password: string;
  created_at?: Date;
  deleted_at?: Date;
 status?: boolean;
 
  // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;
}

// 2. Create a Schema corresponding to the document interface.
const loginSchema = new Schema<ILogin>({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
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

const Login = model<ILogin>('Login', loginSchema);
export default Login;
