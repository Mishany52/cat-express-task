import {NextFunction, Request, Response} from "express";

interface RequestWithTimestamp extends Request {
    timestamp?: number;
}

export function loggerMiddleware(req: RequestWithTimestamp, res: Response, next: NextFunction) {
    req.timestamp = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - (req.timestamp || 0);
        const status = res.statusCode;
        const method = req.method;
        const url = req.originalUrl;
        console.log(`[${new Date().toISOString()}] ${method} ${url} - status:${status} duration:(${duration}ms)`);
    });

    next();
}