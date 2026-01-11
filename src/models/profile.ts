//Users
import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IRole } from './role';
import HobbiesSlug from '../utils/enum/hobbies_slug';
import Gender from '../utils/enum/gender_slug';
import CountrySlug from '../utils/enum/country_slug';

export interface IProfile extends Document {
//   id: string;
user:Types.ObjectId;
  firstName: string;
   lastName:  string;
  email:Types.ObjectId;
  
  mobile: number;
   hobbies:  [HobbiesSlug];
   gender: Gender;
   country: CountrySlug;
   state: string;
    dob: Date;
    event_time: string;
// image: string;
  status?: boolean; 
  created_at?: Date;
  deleted_at?: Date;

  // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;
}

// 2. Create a Schema corresponding to the document interface.
const profileSchema = new Schema<IProfile>({
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // Optional: ensures one profile per user
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
     type: Schema.Types.ObjectId,
      // required: true,
      ref: "User",
   },
  hobbies: {
    trim: true,
    type: [String],
    enum: Object.values(HobbiesSlug),
    default: [],

  },
   gender: {
     trim: true,
    type: String,
    enum: Object.values(Gender),
    default: null,

  },
   country: {
    trim: true,
    type: String,
    enum: Object.values(CountrySlug),
    default: null,
  },
    state: {
    type: String,
    // required: true,
     default: null
  },
 mobile: {
    trim: true,
    type: Number,
    default: null,
  },   
  dob: {
     trim: true,
    type: Date,
    default: null,
//  required: true,
  },
    event_time: {
    type: String,
      trim: true,
    // required: true,
     default: null
  },
  //   image: {
  //   type: String,
  //   // required: true,
  //    default: null
  // },
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

const Profile = model<IProfile>('Profile', profileSchema);
export default Profile;
