import axios from "axios";
import path from "path";
import { getUrlApi } from "./general.utils";
import { Request } from "express";
import { handleError } from "./general.utils";

const absolutePath = path.resolve(__dirname);
const parts = absolutePath.split(path.sep);
const APP_NAME = path.basename(parts[parts.indexOf("src") - 1]);
const API_URL = "https://notification.hdtech.ltd/v1/bot/notifications/";
export async function telegramNotification(err: string, req: Request) {
  const url = getUrlApi(req);
  const errorMessage = handleError(err);
  return await axios.post(
    API_URL,
    {
      appName: APP_NAME,
      error: errorMessage,
      apiUrl: url,
    },
    { headers: { "Content-Type": "application/json" } }
  );
}
