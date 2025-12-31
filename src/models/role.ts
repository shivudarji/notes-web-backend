import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose';
import { IService } from './service';
// 1. Create an interface representing a document in MongoDB.
interface IRole extends Document {
  name: string;
  description?: string;
  slug: string;
  //is_mobile_app?: Boolean;
  //is_web_app?: Boolean;
  permissions?: [];
  role_permissions: [];
  is_system_role?: Boolean;
  //allow_to_company?: Boolean;
  service: Array<PopulatedDoc<Document<Types.ObjectId> & IService>>;
  company: Types.ObjectId;
  status: boolean;
  deleted_at?: Date;
  updated_at?: Date;
  created_at?: Date;
  _doc: any;
}

// 2. Create a Schema corresponding to the document interface.
const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: null,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  permissions: {
    type: Array,
  },
  role_permissions: [
    {
      type: String,
      required: true,
    },
  ],
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // is_mobile_app: {
  //   type: Boolean,
  //   default: false,
  // },
  // is_web_app: {
  //   type: Boolean,
  //   default: false,
  // },
  is_system_role: {
    type: Boolean,
    default: false,
  },
  service: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
  ],
  // allow_to_company: {
  //   type: Boolean,
  //   default: false
  // },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    default: null,
  },
  status: {
    type: Boolean,
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

roleSchema.statics.exists = async function (id) {
  const count = await this.countDocuments({ _id: id });
  return count > 0;
};

const Role = model<IRole>('Role', roleSchema);
export { Role, IRole };
