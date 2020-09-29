import { Schema } from 'mongoose';
import Constants from '../../../../common/Constants';

const AssigmentSchema = new Schema({
  title: { type: String, max: 50, index: true },
  assignmentType: {
    type: String,
    enum: [
    ],
    trim: true,
  },
  frequency: {
    type: String,
    enum: [
      Constants.FREQUENCY_ONCE_OFF,
      Constants.FREQUENCY_MONTHLY,
      Constants.FREQUENCY_WEEKLY,
      Constants.FREQUENCY_DAILY,
      Constants.FREQUENCY_OTHER
    ],
    trim: true,
  },
  description: {type: String },
  eventStartTime: { type: Date },
  eventEndTime: { type: Date },
  skillsRequired: { type: [String] },
  tags:{ type: [String] },
  location: { type: String, required: true },
  major: {
    type: String,
    enum: []
  },
  needMajorMatch: { type: Boolean }
});

export default AssigmentSchema;