import {IsString} from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCatRequestDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Whiskers"
 */
export class CreateCatRequestDto {
    @IsString()
    name: string;
}
