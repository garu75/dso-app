import { Schema } from 'mongoose';
import Constants from '../../../../common/Constants';

const ObjectId = Schema.Types.ObjectId;

const AssigmentSchema = new Schema({
  title: { type: String, max: 50, text: true },
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
  description: { type: String },
  eventStartTime: { type: Date },
  eventEndTime: { type: Date },
  skillsRequired: { type: [String] },
  tags: { type: [String] },
  location: { type: String, required: true },
  major: {
    type: String,
    enum: []
  },
  needMajorMatch: { type: Boolean },
  status: {
    type: String,
    default: Constants.STATUS_UNASSIGNED,
    enum: [
      Constants.STATUS_UNASSIGNED,
      Constants.STATUS_ACCEPTED,
      Constants.STATUS_COMPLETED,
      Constants.STATUS_EXPIRED
    ]
  },
  creator: { type: ObjectId, ref: "UserModel" }
});

export default AssigmentSchema;