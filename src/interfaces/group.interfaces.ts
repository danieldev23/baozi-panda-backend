import mongoose from "mongoose";

export interface IGroup extends Document {
    name: string;
    members: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
  }
  