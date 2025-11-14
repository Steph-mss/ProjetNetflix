// stream-api/swaggerConfig.js
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
        url: 'http://localhost:4000', // Votre serveur de dev
      },
    ],
    // Définit comment l'authentification (token) fonctionne
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
  // Fichiers à scanner pour trouver les commentaires Swagger
  apis: ['./routes/*.js'], // Pointez vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);
export default specs;