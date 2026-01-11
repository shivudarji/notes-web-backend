//Users
import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IRole } from './role';
import HobbiesSlug from '../utils/enum/hobbies_slug';
import Gender from '../utils/enum/gender_slug';
import CountrySlug from '../utils/enum/country_slug';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
   password: string;
  cpswd: string;
  profile:Types.ObjectId;
//    role: Array<PopulatedDoc<Document<Types.ObjectId> & IRole>>;
//   hobbies:  HobbiesSlug;
//    gender: Gender;
//    country: CountrySlug;
//    state: string;
//     dob: Date;
//     event_time: string;
// image: string;
  status?: boolean;
 
  created_at?: Date;
  deleted_at?: Date;

  // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpswd: {
    type: String,
    default: null,
     required: true,
  },
    // 🔗 Profile reference
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  //   hobbies: {
  //     trim: true,
  //     type: String,
  //     enum: Object.values(HobbiesSlug),
  //     default: null,
  
  //   },
  //    gender: {
  //      trim: true,
  //     type: String,
  //     enum: Object.values(Gender),
  //     default: null,
  
  //   },
  //    country: {
  //     trim: true,
  //     type: String,
  //     enum: Object.values(CountrySlug),
  //     default: null,
  //   },
  //     state: {
  //     type: String,
  //     required: true,
  //      default: null
  //   },
  //     dob: {
  //      trim: true,
  //     type: Date,
  //     default: null,
  //  required: true,
  //   },
  //     event_time: {
  //     type: String,
  //     // required: true,
  //      default: null
  //   },
  //     image: {
  //     type: String,
  //     // required: true,
  //      default: null
  //   },
  
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

const User = model<IUser>('User', userSchema);
export default User;
