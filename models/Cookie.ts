import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICookie extends Document {
  websiteName: string;
  websiteUrl?: string;
  slug: string;
  description?: string;
  email?: string;
  password?: string;
  otpWebpage?: string;
  cookies: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CookieSchema: Schema = new Schema(
  {
    websiteName: {
      type: String,
      required: [true, 'Website name is required'],
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: '',
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    otpWebpage: {
      type: String,
      trim: true,
      default: '',
    },
    cookies: {
      type: String,
      default: '',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
CookieSchema.index({ slug: 1 }, { unique: true });
CookieSchema.index({ isPublic: 1 });

// Prevent model recompilation during development
const Cookie: Model<ICookie> =
  mongoose.models.Cookie || mongoose.model<ICookie>('Cookie', CookieSchema);

export default Cookie;
