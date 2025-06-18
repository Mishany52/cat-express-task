import express, {Request, Response} from "express";
import {validateDtoMiddleware} from "./middleware/validate-dto.middleware";
import {CreateCatRequestDto} from "./dto/create-cat.request-dto";
import {CatEntity} from "./cat.entity";

const petRouter = express.Router();

/**
 * @swagger
 * /pet:
 *   post:
 *     summary: Создать нового кота
 *     tags:
 *       - pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCatRequestDto'
 *     responses:
 *       201:
 *         description: Кот создан
 *       400:
 *         description: Ошибка валидации
 */
petRouter.post('/', validateDtoMiddleware(CreateCatRequestDto),
    (req: Request, res: Response) => {
        CatEntity.create(req.body);
        res.status(201).json({message: 'Завели нового кота'});
    }
);

/**
 * @swagger
 * /pet:
 *   get:
 *     summary: Получение данных кота
 *     tags:
 *       - pet
 *     responses:
 *       200:
 *         description: Данные кота
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/GetCatVitalPropertiesResponseDto'
 *       400:
 *         description: Кота еще не завели
 */
petRouter.get('/', (req: Request, res: Response) => {
    const catInstance = CatEntity.getInstance()
    res.status(200).json(catInstance.getVitalProperties())
})

/**
 * @swagger
 * /pet/feed:
 *   post:
 *     summary: Покормить кота
 *     description: Покормить кота, чтобы понизить его голод на 30 и повысить настроение на 10
 *     tags:
 *       - pet
 *     responses:
 *       200:
 *         description: Кот успешно покормлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Вы покормили своего кота понизив его голод на 30 и повысив настроение на 10. Сытый кот - довольный кот"
 *       400:
 *         description: Кота еще не завели
 */
petRouter.post('/feed', (req: Request, res: Response) => {
    const catInstance = CatEntity.getInstance()
    catInstance.toFeed();
    res.status(200).json({
        message: 'Вы покормили своего кота понизив его голод на 30 и повысив настроение на 10. ' +
            'Сытый кот - довольный кот'
    })
})

/**
 * @swagger
 * /pet/heal:
 *   post:
 *     summary: Полечить кота
 *     description: Полечить кота, чтобы повысить его здоровье на 20 и голод на 5
 *     tags:
 *       - pet
 *     responses:
 *       200:
 *         description: Кот успешно полечен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Вы полечили своего кота."
 *       400:
 *         description: Кота еще не завели
 */
petRouter.post('/heal', (req: Request, res: Response) => {
    const catInstance = CatEntity.getInstance()
    catInstance.toHeal();
    res.status(200).json({message: 'Вы полечили своего кота. Теперь он стал здоровее на 20 ед. и голоднее на 5 ед.'})
})

/**
 * @swagger
 * /pet/play:
 *   post:
 *     summary: Поиграть с котом
 *     description: Поиграть с котом, чтобы повысить его настроение на 15 и голод на 5
 *     tags:
 *       - pet
 *     responses:
 *       200:
 *         description: Вы поиграли со своим котом.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Вы поиграли со своим котом."
 *       400:
 *         description: Кота еще не завели
 */
petRouter.post('/play', (req: Request, res: Response) => {
    const catInstance = CatEntity.getInstance()
    catInstance.toPlay();
    res.status(200).json({message: 'Вы поиграли со своим котом. ' +
            'Он был очень рад и его настроение поднялось на 15 ед., но проголодался на 5 ед.'})
})


export default petRouter;