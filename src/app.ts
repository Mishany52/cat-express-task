import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger';
import petRouter from "./pet-router";
import {loggerMiddleware} from "./middleware/logger.middleware";
import {handlerErrorsMiddleware} from "./middleware/handler-errors.middleware";

const app = express();
app.use(express.json());

app.use(loggerMiddleware)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/pet', petRouter);

app.use(handlerErrorsMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Сервер запушен на http://localhost:3000');
    console.log('Документация доступна по адресу http://localhost:3000/api-docs');
});

export default app;