import { Types } from "mongoose";

export interface IPostForum  {
    userId: Types.ObjectId;
    content: string;
    images?: string[];
    videos?: string[];
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    createdAt: Date;
  }
  
  export interface IComment extends Document {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    createdAt: Date;
  }
  