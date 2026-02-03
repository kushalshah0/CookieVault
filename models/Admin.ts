import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'admin',
      enum: ['admin', 'superadmin'],
    },
  },
  {
    timestamps: true,
  }
);

// Create index on email for faster queries
AdminSchema.index({ email: 1 }, { unique: true });

// Prevent model recompilation during development
const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
