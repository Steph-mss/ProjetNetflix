import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API MoovFlix (Projet Netflix)',
      version: '1.0.0',
      description: 'Documentation de l\'API pour le projet de streaming Efrei',
    },
    servers: [
      {
        url: 'http://localhost:4000', 
      },
    ],
    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);
export default specs;