import { model } from "mongoose";
import { IMaterialDocument, IMaterialModel } from "./materials.types";
import MaterialSchema from "./materials.schema";

export const MaterialModel = model<IMaterialDocument, IMaterialModel>("material", MaterialSchema);