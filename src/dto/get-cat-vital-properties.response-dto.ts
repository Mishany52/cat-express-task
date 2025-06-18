import {CatStatus} from "../cat-status";

/**
 * @swagger
 * components:
 *   schemas:
 *     GetCatVitalPropertiesResponseDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Whiskers"
 *         age:
 *           type: number
 *           example: 3
 *         health:
 *           type: number
 *           example: 85
 *         hungry:
 *           type: number
 *           example: 40
 *         mood:
 *           type: number
 *           example: 75
 *         status:
 *           type: string
 *           enum: [sick, alive, dead]
 *           example: "alive"
 */
export class GetCatVitalPropertiesResponseDto {
    name: string;
    age: number;
    health: number;
    hungry: number;
    mood: number;
    status: CatStatus;
}