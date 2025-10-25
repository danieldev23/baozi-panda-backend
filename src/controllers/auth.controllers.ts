import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models";
import { HandleResponse } from "../types/handle-response.types";

const JWT_SECRET = process.env.JWT_SECRET || "dangquochuydeptraivcl";
const JWT_EXPIRES_IN = "7d";

export class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, email, name } = req.body;

      if (!username || !password || !email || !name) {
        return HandleResponse.sendErrorResponse(req, res, "Thiếu thông tin cần thiết.");
      }

      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return HandleResponse.sendErrorResponse(req, res, "Tên đăng nhập hoặc email đã được sử dụng.");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        username,
        password: passwordHash,
        email,
        name,
        avatarBase: "/images/default-avatar.png",
        currentFrameId: null,
        ownedFrameIds: [],
        hskLevel: 1,
        level: 1,
        point: 0,
        streak: 0,
        accuracy: 100,
        xp: 0,
        lastLogin: new Date(),
        achievements: [],
        stats: {
          weeklyActivity: [],
          totalWordsLearned: 0,
          totalExercises: 0,
        },
        createdAt: new Date(),
      });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const safeUser = user.toObject();
      const { password: _, ...userWithoutPassword } = safeUser;

      return HandleResponse.sendSuccessResponseWithoutMessage(res, {
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Register Error:", error);
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return HandleResponse.sendErrorResponse(req, res, "Thiếu thông tin đăng nhập.");
      }

      const user = await UserModel.findOne({
        $or: [{ username }, { email: username }],
      }).select("+password");

      if (!user) {
        return HandleResponse.sendErrorResponse(req, res, "Người dùng không tồn tại.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return HandleResponse.sendErrorResponse(req, res, "Mật khẩu không đúng.");
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const safeUser = user.toObject();
      const { password: _, ...userWithoutPassword } = safeUser;
      
      return HandleResponse.sendSuccessResponseWithoutMessage(res, {
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Login Error:", error);
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }

  public async getMe(req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return HandleResponse.sendErrorResponse(req, res, "Không có token hoặc token không hợp lệ.");
      }

      const token = authHeader.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);

      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return HandleResponse.sendErrorResponse(req, res, "Người dùng không tồn tại.");
      }

      const safeUser = user.toObject();
      const { password: _, ...userWithoutPassword } = safeUser;

      return HandleResponse.sendSuccessResponseWithoutMessage(res, userWithoutPassword);
    } catch (error: any) {
      console.error("GetMe Error:", error);
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }
}
