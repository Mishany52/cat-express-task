import {NextFunction, Response, Request} from "express";

export function handlerErrorsMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(`[${new Date().toISOString()}] ERROR: ${err.message}`);
    res.status(400).json(err.message);
}