import { Request, Response } from "express";
import { GroupModel } from "../models/group.models";
import { MessageModel } from "../models/message.models";
import { HandleResponse } from "../types/handle-response.types";
import { getIO } from "../gateway/socket.gateway";

export class ChatController {
  public async createGroup(req: Request, res: Response): Promise<Response> {
    try {
      const { name, members } = req.body;
      const userId = '68fd037d673cd3650bd98801';


      if (!name || !members || !Array.isArray(members)) {
        return HandleResponse.sendErrorResponse(req, res, "Thiếu thông tin nhóm");
      }

      const group = await GroupModel.create({
        name,
        members: [userId, ...members],
        createdBy: userId,
      });

      return HandleResponse.sendSuccessResponseWithoutMessage(res, group);
    } catch (error: any) {
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }

  public async sendGroupMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { groupId, content } = req.body;
      const senderId = (req as any).user.id;

      if (!groupId || !content) {
        return HandleResponse.sendErrorResponse(req, res, "Thiếu thông tin tin nhắn");
      }

      const group = await GroupModel.findById(groupId);
      if (!group) {
        return HandleResponse.sendErrorResponse(req, res, "Nhóm không tồn tại");
      }

      const message = await MessageModel.create({
        sender: senderId,
        groupId,
        content,
      });

      const populatedMessage = await message.populate("sender", "username name avatarBase");

      const io = getIO();
      io.to(groupId.toString()).emit("groupMessage", populatedMessage);

      return HandleResponse.sendSuccessResponseWithoutMessage(res, populatedMessage);
    } catch (error: any) {
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }

  public async getGroupMessages(req: Request, res: Response): Promise<Response> {
    try {
      const { groupId } = req.params;
      const messages = await MessageModel.find({ groupId })
        .populate("sender", "username name avatarBase")
        .sort({ createdAt: 1 });

      return HandleResponse.sendSuccessResponseWithoutMessage(res, messages);
    } catch (error: any) {
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }

  // Lấy danh sách nhóm mà user đang tham gia
  public async getUserGroups(req: Request, res: Response): Promise<Response> {
    try {
      const userId = '68fd037d673cd3650bd98801';
      console.log(`Fetching groups for user: ${userId}`);
      const groups = await GroupModel.find({ members: userId });

      return HandleResponse.sendSuccessResponseWithoutMessage(res, groups);
    } catch (error: any) {
      return HandleResponse.sendErrorResponse(req, res, error.message);
    }
  }
}
