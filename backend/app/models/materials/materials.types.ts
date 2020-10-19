import { Document, Model } from "mongoose";

export interface IMaterial {
  title: string;
  engagementType: string;
  frequency: string;
  eventStartTime: Date;
  eventEndTime: Date;
  skillsRequired: string[];
  tags: string[];
  location: string;
  major: string;
  needMajorMatch: boolean;
}
export interface IMaterialDocument extends IMaterial, Document {
}

export interface IMaterialModel extends Model<IMaterialDocument> {
}