import joi from "joi";
import dotenv from "dotenv";
dotenv.config({
    path:
        process.env.NODE_ENV === "development"
            ? ".env.producion"
            : ".env.development",
});

const envSchema = joi.object({
    PORT: joi.number().default(3000),
    NODE_ENV: joi
        .string()
        .default("development")
        .valid("production", "development"),
    OLLAMA_URL: joi.string().uri().required(),
    OLLAMA_MODEL: joi.string().required(),
    MAX_FILE_SIZE: joi.number().default(10 * 1024 * 1024), // 10 MB
    CORS_ORIGIN: joi.string().default("*"),  
});

// Validate the loaded environment variables
const { error, value } = envSchema.validate(process.env, {
    allowUnknown: true,
    abortEarly: false,
});

if (error) {
    console.error("Environment variable validation error:", error.details);
    process.exit(1); // Exit the application if validation fails
}
export default {
    port: value.PORT,
    nodeEnv: value.NODE_ENV,
    ollamaUrl: value.OLLAMA_URL,
    ollamaModel: value.OLLAMA_MODEL,
    maxFileSize: value.MAX_FILE_SIZE,
    corsOrigin: value.CORS_ORIGIN,
};
