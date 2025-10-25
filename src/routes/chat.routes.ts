import { Router } from "express";
import { ChatController } from "../controllers/chat.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";
const router = Router();
const chatController = new ChatController();

router.use(verifyToken);

router.post("/group", (req, res) => chatController.createGroup(req, res));

router.post("/group/message", (req, res) => chatController.sendGroupMessage(req, res));

router.get("/group/:groupId/messages", (req, res) => chatController.getGroupMessages(req, res));
router.get("/my-groups", (req, res) => chatController.getUserGroups(req, res));

export default router;
