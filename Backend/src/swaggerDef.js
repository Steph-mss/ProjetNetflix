

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: `API AniméFlix`,
    version: '1.0.0',
    description: `Documentation de l'API pour le projet de streaming Efrei`,
  },
  servers: [
    { url: 'http://localhost:4000' }
  ],
  tags: [
    { name: 'Auth', description: 'Authentification' },
    { name: 'Users', description: '(Admin) Gestion des utilisateurs' },
    { name: 'Films', description: 'Gestion des films' },
    { name: 'Series', description: 'Gestion des séries' },
    { name: 'Favoris', description: 'Gestion des favoris (MongoDB)' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nom: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['user', 'admin'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Film: {
        type: 'object',
        required: ["titre", "description", "categories", "images", "dateDeSortie"],
        properties: {
          id: { type: 'integer', readOnly: true },
          titre: { type: 'string' },
          description: { type: 'string' },
          categories: { type: 'array', items: { type: 'string' } },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          dateDeSortie: { type: 'string', format: 'date-time' }
        }
      },
      Serie: {
        type: 'object',
        required: ["titre", "description", "categories", "images", "dateDeSortie"],
        properties: {
          id: { type: 'integer', readOnly: true },
          titre: { type: 'string' },
          description: { type: 'string' },
          categories: { type: 'array', items: { type: 'string' } },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          dateDeSortie: { type: 'string', format: 'date-time' }
        }
      },
      FavorisPopulated: {
        type: 'object',
        properties: {
           _id: { type: 'string' },
           type: { type: 'string', enum: ['Film', 'Serie'] },
           id: { type: 'integer' },
           titre: { type: 'string' },
           description: { type: 'string' },
           categories: { type: 'array', items: { type: 'string' } },
           images: { type: 'array', items: { type: 'string' } },
           dateDeSortie: { type: 'string', format: 'date-time' }
        }
      },
      FavorisInput: {
        type: 'object',
        required: ["mediaId", "mediaType"],
        properties: {
          mediaId: { type: 'integer', example: 1 },
          mediaType: { type: 'string', enum: ['Film', 'Serie'] }
        }
      }
    }
  },
 
  paths: {
    
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: `Créer un nouvel utilisateur`,
        security: [],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['nom', 'email', 'password'], properties: { nom: { type: 'string', example: 'Jawad' }, email: { type: 'string', format: 'email', example: 'jawad@gmail.com' }, password: { type: 'string', format: 'password', example: '123' } } } } }
        },
        responses: { '201': { description: `Utilisateur créé` }, '400': { description: `Données invalides` } }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: `Connecter un utilisateur`,
        security: [],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email', example: 'jawad@gmail.com' }, password: { type: 'string', format: 'password', example: '123' } } } } }
        },
        responses: { '200': { description: `Connexion réussie, renvoie les tokens`, content: { 'application/json': { schema: { type: 'object', properties: { accessToken: { type: 'string' }, refreshToken: { type: 'string' } } } } } }, '401': { description: `Identifiants invalides` } }
      }
    },
    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: `Rafraîchir un access token`,
        security: [],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string', description: `Le refreshToken valide` } } } } } },
        responses: { '200': { description: `Nouveau accessToken généré` }, '401': { description: `Refresh token manquant ou invalide` } }
      }
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: `Récupérer le profil de l'utilisateur connecté`,
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: `Profil de l'utilisateur`, content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '401': { description: `Non autorisé` } }
      }
    },
   
    '/films': {
      get: {
        tags: ['Films'],
        summary: `Récupérer la liste de tous les films`,
        security: [],
        responses: { '200': { description: `Une liste de films`, content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Film' } } } } } }
      },
      post: {
        tags: ['Films'],
        summary: `(Admin) Créer un nouveau film`,
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Film' } } } },
        responses: { '201': { description: `Film créé` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit (pas admin)` } }
      }
    },
    '/films/{id}': {
      get: {
        tags: ['Films'],
        summary: `Récupérer un film spécifique par son ID`,
        security: [],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique du film` }],
        responses: { '200': { description: `Les détails du film`, content: { 'application/json': { schema: { $ref: '#/components/schemas/Film' } } } }, '404': { description: `Film non trouvé` } }
      },
      put: {
        tags: ['Films'],
        summary: `(Admin) Mettre à jour un film existant`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique du film` }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Film' } } } },
        responses: { '200': { description: `Film mis à jour` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Film non trouvé` } }
      },
      delete: {
        tags: ['Films'],
        summary: `(Admin) Supprimer un film`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique du film` }],
        responses: { '204': { description: `Film supprimé` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Film non trouvé` } }
      }
    },

    '/series': {
      get: {
        tags: ['Series'],
        summary: `Récupérer la liste de toutes les séries`,
        security: [],
        responses: { '200': { description: `Une liste de séries`, content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Serie' } } } } } }
      },
      post: {
        tags: ['Series'],
        summary: `(Admin) Créer une nouvelle série`,
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Serie' } } } },
        responses: { '201': { description: `Série créée` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit (pas admin)` } }
      }
    },
    '/series/{id}': {
      get: {
        tags: ['Series'],
        summary: `Récupérer une série spécifique par son ID`,
        security: [],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de la série` }],
        responses: { '200': { description: `Les détails de la série`, content: { 'application/json': { schema: { $ref: '#/components/schemas/Serie' } } } }, '404': { description: `Série non trouvée` } }
      },
      put: {
        tags: ['Series'],
        summary: `(Admin) Mettre à jour une série existante`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de la série` }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Serie' } } } },
        responses: { '200': { description: `Série mise à jour` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Série non trouvée` } }
      },
      delete: {
        tags: ['Series'],
        summary: `(Admin) Supprimer une série`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de la série` }],
        responses: { '204': { description: `Série supprimée` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Série non trouvée` } }
      }
    },
    // --- FAVORIS ---
    '/favoris/user/{id}': {
      get: {
        tags: ['Favoris'],
        summary: `Récupérer les favoris d'un utilisateur par son ID`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de l'utilisateur (de PostgreSQL)` }],
        responses: { '200': { description: `Une liste de favoris`, content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/FavorisPopulated' } } } } }, '401': { description: `Non autorisé` } }
      }
    },
    '/favoris': {
      post: {
        tags: ['Favoris'],
        summary: `Ajouter un film ou une série aux favoris`,
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/FavorisInput' } } } },
        responses: { '201': { description: `Favori ajouté` }, '400': { description: `Données manquantes` }, '401': { description: `Non autorisé` }, '404': { description: `Contenu introuvable` } }
      }
    },
    '/favoris/{id}': {
      delete: {
        tags: ['Favoris'],
        summary: `Supprimer un favori par son ID (de MongoDB)`,
        security: [{ bearerAuth: [] }],
        
        parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: `L'ID MongoDB (_id) de l'entrée favori` }],
        responses: { '204': { description: `Favori supprimé` }, '401': { description: `Non autorisé` }, '404': { description: `Favori non trouvé` } }
      }
    },
   
    '/users': {
      get: {
        tags: ['Users'],
        summary: `(Admin) Récupérer la liste de tous les utilisateurs`,
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: `Une liste d'utilisateurs`, content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } } }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` } }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: `(Admin) Récupérer un utilisateur par son ID`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de l'utilisateur` }],
        responses: { '200': { description: `Détails de l'utilisateur`, content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Utilisateur non trouvé` } }
      },
      put: {
        tags: ['Users'],
        summary: `(Admin) Mettre à jour un utilisateur (ex: changer son rôle)`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de l'utilisateur` }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { nom: { type: 'string' }, email: { type: 'string', format: 'email' }, role: { type: 'string', enum: ['user', 'admin'] } } } } } },
        responses: { '200': { description: `Utilisateur mis à jour` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Utilisateur non trouvé` } }
      },
      delete: {
        tags: ['Users'],
        summary: `(Admin) Supprimer un utilisateur`,
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: `L'ID numérique de l'utilisateur` }],
        responses: { '204': { description: `Utilisateur supprimé` }, '401': { description: `Non autorisé` }, '403': { description: `Interdit` }, '404': { description: `Utilisateur non trouvé` } }
      }
    }
  } 
};

module.exports = swaggerDefinition;