import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export function validateDtoMiddleware(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dto, req.body);
        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            res.status(400).json({
                message: 'Ошибка при валидации тела запроса',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints,
                }))
            });
            return;
        }

        req.body = dtoInstance;
        next();
    }
}