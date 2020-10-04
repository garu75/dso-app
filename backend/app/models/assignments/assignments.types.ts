import { Schema } from 'mongoose';
import { Document, Model } from "mongoose";

export interface IAssignment {
  title: string;
  assignmentType: string;
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
export interface IAssignmentDocument extends IAssignment, Document {
}

export interface IAssignmentModel extends Model<IAssignmentDocument> {
}