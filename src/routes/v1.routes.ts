import { Router } from "express";
import { vocabularyController } from "../utils/api.utils";
// import userRoute from "./user.routes";
import authRoute from "./auth.routes";
import chatRoute from "./chat.routes";
const router = Router();

router.get("/v1/vocabulary", vocabularyController.getAll.bind(vocabularyController));
router.get("/v1/vocabulary/search", vocabularyController.searchByQuery.bind(vocabularyController));
router.get("/v1/vocabulary/tts", vocabularyController.text2Speech.bind(vocabularyController));
router.use("/v1/auth", authRoute);
router.use("/v1/chat", chatRoute);
export default router;
