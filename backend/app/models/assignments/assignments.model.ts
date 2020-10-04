import { model } from "mongoose";
import { IAssignmentDocument, IAssignmentModel } from "./assignments.types";
import AssignmentSchema from "./assignments.schema";

export const AssignmentModel = model<IAssignmentDocument, IAssignmentModel>("assignment", AssignmentSchema);