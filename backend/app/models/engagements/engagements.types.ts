import { Schema } from 'mongoose';
import { Document, Model } from "mongoose";

export interface IEngagement {
  title: string;
  engagementType: string;
  frequency: string;
  description: string;
  eventStartTime: Date;
  eventEndTime: Date;
  skillsRequired: string[];
  tags: string[];
  location: string;
  major: string;
  needMajorMatch: boolean;
  status: string;
  creator: Schema.Types.ObjectId;
}
export interface IEngagementDocument extends IEngagement, Document {
}

export interface IEngagementModel extends Model<IEngagementDocument> {
}