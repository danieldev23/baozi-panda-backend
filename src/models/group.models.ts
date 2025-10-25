import mongoose, { Schema } from "mongoose";
import { IGroup } from "../interfaces/group.interfaces";

const GroupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  export const GroupModel = mongoose.model<IGroup>("Group", GroupSchema);