import authRouter from "./routers/auth.router";
import ollamaRouter from "./routers/ollama.router";

import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/ollama", ollamaRouter);


export default router;
