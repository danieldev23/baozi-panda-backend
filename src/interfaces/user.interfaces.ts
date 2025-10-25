import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;

  // Ảnh hoặc emoji chính của người dùng
  avatarBase?: string; // 🐼, 😎, ảnh upload

  // Viền avatar đang dùng
  currentFrame?: Types.ObjectId; // tham chiếu đến AvatarFrame

  hskLevel: number;
  level: number; // cấp độ học viên
  point: number; // Bamboo Points
  streak: number;
  accuracy: number;
  xp: number;

  lastLogin: Date;

  achievements: Types.ObjectId[];
  ownedFrames: Types.ObjectId[]; // các viền đã mua
  stats: {
    weeklyActivity: number[];
    totalWordsLearned: number;
    totalExercises: number;
  };

  createdAt: Date;
  updatedAt: Date;
}
