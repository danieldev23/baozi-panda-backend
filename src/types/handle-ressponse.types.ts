import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils/general.utils";
import { Logger } from "../utils/logger.utils";
import { telegramNotification } from "../utils/notification.utils";
export class HandleResponse {
  static sendSuccessResponse<T>(res: Response, data: T) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "Success",
      data,
    });
  }

  static sendSuccessResponseWithoutMessage<T>(res: Response, data: T) {
    return res.status(StatusCodes.OK).json(data);
  }
  static async sendErrorResponse(req: Request, res: Response, error: string) {
    const errorMessage = handleError(error);
    Logger.error(errorMessage);
    // Send error message to Telegram
    // await telegramNotification(errorMessage, req);
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad Request",
      error,
    });
  }
  
}
