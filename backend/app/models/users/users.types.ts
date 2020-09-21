import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
  major: string;
  skills: string[];
  role: string;
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