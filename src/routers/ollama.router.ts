import { Router } from "express";
import {  ollamaController } from "../controllers";
import uploadFile from "../middlewares/multer-file";
const router = Router();

router.get("/health", ollamaController.healthCheck);
router.post("/ocr", uploadFile.single("file"), ollamaController.ocr);
router.get("/models", ollamaController.getModels);
router.get("/models/:modelName", ollamaController.getModelDetails);
router.post("/chat", ollamaController.aiChat);


export default router;
