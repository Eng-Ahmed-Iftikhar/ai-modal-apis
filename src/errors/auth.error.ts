import BaseError from "./base.error";
import { status } from "http-status";

export class UnauthorizedError extends BaseError {
    constructor(description: string) {
        super(status[401], status.UNAUTHORIZED, description, true);
    }
}

