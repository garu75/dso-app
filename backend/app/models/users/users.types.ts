import { Schema } from 'mongoose';
import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  profileImage: string;
  gender: string;
  token: string;
  major: string;
  year?: number;
  skills: string[];
  experience: string;
  timetable: string;
  role: string;
  completedEngagements: Schema.Types.ObjectId[];
  acceptedEngagements: Schema.Types.ObjectId[];
  savedEngagements: Schema.Types.ObjectId[];
}
export interface IUserDocument extends IUser, Document {
  generateToken: (
    this: IUserDocument
  ) => Promise<IUserDocument>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByToken: (
    this: IUserModel,
    token: string
  ) => Promise<IUserDocument | null>; 
}