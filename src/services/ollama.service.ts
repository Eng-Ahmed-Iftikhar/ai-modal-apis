import env from "../config/env";

export const healthCheck = async () => {
  const response = await fetch(`${env.ollamaUrl}/api/tags`);

  if (!response.ok) {
    throw new Error(
      `Ollama service is not reachable. Status: ${response.status}`,
    );
  }

  const data = await response.json();

  const installed = data.models?.some(
    (model: any) =>
      model.name === env.ollamaModel ||
      model.name.startsWith(env.ollamaModel + ":"),
  );
  return installed;
};

export const ocr = async (
  imageBase64: string,
  prompts: { systemPrompt: string; userPrompt: string },
  mode: string,
) => {
  const ollamaResponse = await fetch(`${env.ollamaUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.ollamaModel,
      stream: false,
      format: mode === "json" ? "json" : "",
      messages: [
        {
          role: "system",
          content: prompts.systemPrompt,
        },
        {
          role: "user",
          content: prompts.userPrompt,
          images: [imageBase64],
        },
      ],
      options: {
        temperature: 0,
        num_ctx: 8192,
      },
    }),
    signal: AbortSignal.timeout(180000),
  });

  const data = await ollamaResponse.json();
  return data;
};


export const getModels = async () => {
  const response = await fetch(`${env.ollamaUrl}/api/tags`);
  const data = await response.json();
  return data.models || [];
};

export const getModelDetails = async (modelName: string) => {
  const response = await fetch(`${env.ollamaUrl}/api/models/${modelName}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch model details for ${modelName}. Status: ${response.status}`,
    );
  }
  const data = await response.json();
  return data;
}
export const aiChat = async (
  modelName: string,
  messages: { role: string; content: string }[],
  mode: string,
) => {
  const ollamaResponse = await fetch(`${env.ollamaUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      stream: false,
      format: mode === "json" ? "json" : "",
      messages: messages,
      options: {
        temperature: 0,
        num_ctx: 8192,
      },
    }),
    signal: AbortSignal.timeout(180000),
  });
  const data = await ollamaResponse.json();
  return data;
}