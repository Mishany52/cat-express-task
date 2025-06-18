import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cat API',
            version: '1.0.0',
            description: 'Документации API по ухаживанию за котом',
            contact: {
                email: 'kalintsev309206@gmail.com'
            },
            host: 'localhost:3000'
        }
    },
    apis: ['./src/pet-router.ts', './src/dto/*.ts']
})