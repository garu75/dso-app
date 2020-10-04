import { Schema } from 'mongoose';
import Constants from '../../../../common/Constants';

const MaterialSchema = new Schema({
  title: { type: String, max: 50, index: true },
  category: {
    type: String,
    enum: [
      Constants.CATEGORY_BEFRIENDING_TIPS,
      Constants.CATEGORY_GENERAL_POINTERS,
      Constants.CATEGORY_SPECIFIC_SKILLS
    ],
    trim: true,
  },
  description: { type: String, min: 1, required: true },
  media: { type: String },
});

export default MaterialSchema;