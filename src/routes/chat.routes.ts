import { Router } from "express";
import { ChatController } from "../controllers/chat.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";
const router = Router();
const chatController = new ChatController();

// router.use(verifyToken);
router.get("/my-groups", chatController.getUserGroups);
router.post("/group", chatController.createGroup);
router.post("/group/message", chatController.sendGroupMessage);

router.get("/group/:groupId/messages", chatController.getGroupMessages);


export default router;
