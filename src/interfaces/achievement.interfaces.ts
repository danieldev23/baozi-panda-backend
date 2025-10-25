import { Types } from "mongoose";

export interface IAchievement extends Document {
    title: string; // Ví dụ: "HSK Master"
    description: string;
    type: "common" | "rare" | "epic" | "legendary";
    icon: string; // emoji hoặc icon name
    condition: {
      type: "streak" | "xp" | "lesson" | "rank" | "interaction";
      value: number;
    };
    reward?: {
      point?: number;
      avatarUnlock?: Types.ObjectId;
    };
  }
  