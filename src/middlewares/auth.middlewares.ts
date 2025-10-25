import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HandleResponse } from "../types/handle-response.types";
import UserModel from "../models/user.models";

const JWT_SECRET = process.env.JWT_SECRET || "dangquochuydeptraivcl";

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {

    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return HandleResponse.sendErrorResponse(req, res, "Chưa đăng nhập hoặc token không hợp lệ.");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded?.id) {
      return HandleResponse.sendErrorResponse(req, res, "Token không hợp lệ.");
    }

    // Tìm user trong DB
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return HandleResponse.sendErrorResponse(req, res, "Người dùng không tồn tại.");
    }

    // Gắn user vào request để controller dùng
    (req as any).user = user;

    next();
  } catch (error: any) {
    console.error("verifyToken Error:", error);
    return HandleResponse.sendErrorResponse(req, res, "Token không hợp lệ hoặc đã hết hạn.");
  }
}
