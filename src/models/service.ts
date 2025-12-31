//Country
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IService extends Document {
  name: string;
  slug: string;
  logo: string;
  description: string;
  status: boolean;
  deleted_at?: Date;
  updated_at?: Date;
  created_at?: Date;
  _doc: any;
}

// 2. Create a Schema corresponding to the document interface.
const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
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

serviceSchema.statics.exists = async function (id) {
  const count = await this.countDocuments({ _id: id });
  return count > 0;
};

const Service = model<IService>('Service', serviceSchema, 'service');
export { Service, IService };
