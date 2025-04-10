import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación de la API de AdoptMe',
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpecs);
