import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import { logger } from "../utils/logger";
import { status } from "http-status";
import isDevEnvironment from "../utils/is-development";

class ErrorHandler {
    public async handleError(
        err: Error,
        req?: Request,
        res?: Response,
        _?: NextFunction
    ): Promise<void> {
        logger.error("Error", err);

        if (!req) return;
        let statusCode: number = status.INTERNAL_SERVER_ERROR;
        let message: string = status[500];
        if (err instanceof BaseError) {
            statusCode = err.httpCode;
            message = err.message;
        }

        res?.status(statusCode).json({
            message,
            ...(isDevEnvironment() && { stack: err?.stack }),
        });
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}
export const errorHandler = new ErrorHandler();
