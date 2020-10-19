import { model } from "mongoose";
import { IEngagementDocument, IEngagementModel } from "./engagements.types";
import EngagementSchema from "./engagements.schema";

export const EngagementModel = model<IEngagementDocument, IEngagementModel>("engagement", EngagementSchema);