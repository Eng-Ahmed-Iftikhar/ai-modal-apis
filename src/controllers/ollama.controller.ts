import env from "../config/env";
import { ForbiddenError, NotFoundError } from "../errors/common.error";
import asyncHandler from "../middlewares/aysnc-handler";
import { ollamaService } from "../services";

export const healthCheck = asyncHandler(async (req, res) => {
  const installed = await ollamaService.healthCheck();
  res.json({
    success: true,
    ollama: "connected",
    model: env.ollamaModel,
    model_installed: installed,
  });
});

const modes = ["text", "json"];
export const ocr = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new NotFoundError("No file uploaded");
  }
  const mode = req.body.mode || "text";

  if (!modes.includes(mode)) {
    throw new ForbiddenError(
      `Invalid mode. Allowed modes are: ${modes.join(", ")}`,
    );
  }
  const userPrompt = req.body.prompt || "Read all text from this image.";

  const imageBase64 = file.buffer.toString("base64");

  const systemPrompt = `
You are a professional image-to-text extraction AI.

Your task is to read the uploaded image accurately.

Rules:
1. Extract only information visible in the image.
2. Preserve original spelling, numbers and dates.
3. Do not invent missing information.
4. Do not correct spelling automatically.
5. Preserve the order of text.
6. Read tables row by row.
7. If text is unclear, mark it as [unclear].
8. Do not add explanations unless requested.

${
  mode === "json"
    ? "Return valid JSON only. Do not use Markdown code fences."
    : "Return extracted text in readable plain text."
}
`;

  const prompts = { systemPrompt, userPrompt };
  const data = await ollamaService.ocr(imageBase64, prompts, mode);

  res.json({
    success: true,
    data,
  });
});

export const getModels = asyncHandler(async (req, res) => {
  const models = await ollamaService.getModels();
  res.json({
    success: true,
    models,
  });
});


export const getModelDetails = asyncHandler(async (req, res) => {
  const modelName = req.params.modelName;
  const model = await ollamaService.getModelDetails(modelName);
  if (!model) {
    throw new NotFoundError("Model not found");
  }
  res.json({
    success: true,
    model,
  });
});

export const aiChat = asyncHandler(async (req, res) => {
  const modelName = req.body.modelName || env.ollamaModel;
  const messages = req.body.messages;
  const mode = req.body.mode || "text";
  const data = await ollamaService.aiChat(modelName, messages, mode);
  res.json({
    success: true,
    data,
  });
});
