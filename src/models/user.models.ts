import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false  },
    avatarBase: { type: String },
    currentFrame: { type: Schema.Types.ObjectId, ref: "AvatarFrame" },
    hskLevel: { type: Number, required: true },
    level: { type: Number, required: true },    
    point: { type: Number, required: true },
    streak: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    xp: { type: Number, required: true },
    lastLogin: { type: Date, required: true },
    achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
    ownedFrames: [{ type: Schema.Types.ObjectId, ref: "AvatarFrame" }],
    stats: {
        weeklyActivity: [{ type: Number }],
        totalWordsLearned: { type: Number, required: true },
        totalExercises: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;