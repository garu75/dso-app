import { Schema } from 'mongoose';
import Constants from '../../../../common/Constants';
import { generateToken } from './users.methods';
import { findByToken } from "./users.statics";

const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: { type: String, max: 50, index: true },
  email: { type: String, trim: true, unique: true },
  password: { type: String, min: 5, required: true },
  completedAssignments: { type: [{type: ObjectId, ref: 'AssignmentModel'}] },
  acceptedAssignments: { type: [{type: ObjectId, ref: 'AssignmentModel'}] },
  savedAssignments: { type: [{type: ObjectId, ref: 'AssignmentModel'}] },
  token: {
    type: String,
  },
  major: {
    type: String
  },
  skills: { type: [String] },
  role: {
    type: String,
    enum: [
      Constants.ROLE_ADMIN,
      Constants.ROLE_SSN,
      Constants.ROLE_VOLUNTEER
    ],
    default: Constants.ROLE_VOLUNTEER
  },
});

UserSchema.statics.findByToken = findByToken;

UserSchema.methods.generateToken = generateToken;

export default UserSchema;