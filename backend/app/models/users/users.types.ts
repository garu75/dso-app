import { Schema } from 'mongoose';
import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  token: string;
  major: string;
  year?: number;
  skills: string[];
  experience: string;
  timetable: string;
  role: string;
  completedAssignments: Schema.Types.ObjectId[];
  acceptedAssignments: Schema.Types.ObjectId[];
  savedAssignments: Schema.Types.ObjectId[];
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