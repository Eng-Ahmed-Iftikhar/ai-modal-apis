import BaseError from "./base.error";
import { status } from "http-status";

export class NotFoundError extends BaseError {
  constructor(description: string) {
    super(status[404], status.NOT_FOUND, description, true);
  }
}

export class ForbiddenError extends BaseError {
  constructor(description: string) {
    super(status[403], status.FORBIDDEN, description, true);
  }
}
