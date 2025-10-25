import { Types } from "mongoose";

export interface ILeaderboard extends Document {
    userId: Types.ObjectId;
    globalRank: number;
    weekRank: number;
    monthRank: number;
    xp: number;
    accuracy: number;
    totalWords: number;
    updatedAt: Date;
  }
  