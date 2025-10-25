import { Router } from "express";
import { userController } from "../utils/api.utils";

const router = Router();

router.post("/register", userController.register);

export default router;