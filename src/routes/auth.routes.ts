import { Router } from "express";
import { authController } from "../utils/api.utils";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe);
export default router;