import { Schema } from 'mongoose';
import Constants from '../../../../common/Constants';
import { generateToken } from './users.methods';
import { findByToken } from "./users.statics";

const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  email: { type: String, trim: true, unique: true },
  name: { type: String, max: 50 },
  phone: { type: String },
  password: { type: String, min: 5, required: true },
  completedAssignments: { 
    type: [{type: ObjectId, ref: 'assignment' }],
  },
  acceptedAssignments: { 
    type: [{type: ObjectId, ref: 'assignment' }],
    
  },
  savedAssignments: { 
    type: [{type: ObjectId, ref: 'assignment' }],
  },
  token: { type: String },
  major: { type: String },
  gender: { type: String },
  year: { type: Number },
  experience: { type: String },
  timetable: { type: String },
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