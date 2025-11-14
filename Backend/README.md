# API de Streaming

Backend pour une application de streaming similaire à Netflix.

## Fonctionnalités

- Films (CRUD)
- Séries (CRUD)
- Favoris (SQL + MongoDB)
- Authentification JWT (jeton d'accès + jeton de rafraîchissement)
- Rôles utilisateur (utilisateur / administrateur)
- Historique dans MongoDB
- API GraphQL
- PostgreSQL + Prisma
- MongoDB + Mongoose
- Sécurité avancée (Helmet, limites de taux, RBAC, validation)
- Swagger
- CI/CD (GitHub Actions)
- Tests complets (supertest)

## Démarrage rapide

1.  Cloner le dépôt
2.  `npm install`
3.  Créer un fichier `.env` basé sur `.env.example`
4.  `npx prisma migrate dev`
5.  `npx prisma studio`
6.  `npm run dev`

## API

Voir `api.md` et `api_requests.md` pour plus de détails.