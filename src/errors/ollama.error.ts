import BaseError from "./base.error";
import { status } from "http-status";

export class OllamaOcrError extends BaseError {
  constructor(description: string) {
    super(status[500], status.INTERNAL_SERVER_ERROR, description, true);
  }
}