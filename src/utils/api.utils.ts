import { AuthController } from "../controllers/auth.controllers";
import { UserController } from "../controllers/user.controllers";
import { VocabularyController } from "../controllers/vocabulary.controllers";

export const vocabularyController = new VocabularyController();
export const userController = new UserController();
export const authController = new AuthController()