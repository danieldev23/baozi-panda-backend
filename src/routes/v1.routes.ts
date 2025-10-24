import { Router } from "express";
import { vocabularyController } from "../utils/api.utils";
const router = Router();

router.get("/v1/vocabulary", vocabularyController.getAll.bind(vocabularyController));
router.get("/v1/vocabulary/search", vocabularyController.searchByQuery.bind(vocabularyController));
router.get("/v1/vocabulary/tts", vocabularyController.text2Speech.bind(vocabularyController));

export default router;
