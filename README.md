🎬 MoovFlix - Plateforme de Streaming Animée

Ce projet a été développé dans le cadre du TP de Développement Back-End pour l'Efrei par Jawad Labed et Steven Simonis.

C'est une application complète de streaming de style Netflix, conçue autour d'une architecture moderne découpée en deux services principaux : un Frontend React/Vite et un Backend Node.js/Express/Prisma.

⚙️ Architecture du Projet

Le projet est organisé en deux dossiers principaux :

stream-api/: Le serveur Node.js/Express (API REST et GraphQL).

streaming/: L'interface utilisateur React/Vite (Frontend).

🚀 1. Démarrage du Backend (stream-api/)

Ce service gère l'authentification (JWT), les données (PostgreSQL/Prisma) et les favoris (MongoDB).

Prérequis

Node.js (version 18 ou supérieure)

Un serveur PostgreSQL en cours d'exécution (pour les films, séries, utilisateurs).

Un serveur MongoDB en cours d'exécution (pour les favoris).

Un fichier .env configuré (voir l'étape 3).

Étape 1 : Installation et Configuration

Ouvrez un terminal dans le dossier stream-api/ :

npm install


Étape 2 : Configuration des Bases de Données

Vous devez créer un fichier .env à la racine de stream-api/ avec les variables suivantes :

# --- Base de données PostgreSQL (Prisma) ---
DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[NOM_BDD]?schema=public"

# --- Base de données MongoDB (Mongoose) ---
MONGO_URL="mongodb://localhost:27017/animeflix_db"

# --- Sécurité JWT ---
JWT_SECRET="VOTRE_CLE_SECRETE_POUR_ACCESS_TOKEN"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_SECRET="VOTRE_CLE_SECRETE_POUR_REFRESH_TOKEN"
JWT_REFRESH_EXPIRES_IN="7d"


Étape 3 : Initialisation du Schéma (Prisma)

Appliquez le schéma Prisma à votre base de données PostgreSQL :

npx prisma migrate dev
npx prisma generate


Étape 4 : Lancement du Serveur

npm run dev


Le serveur démarrera sur http://localhost:4000.

Vous pouvez accéder à la documentation complète de l'API (Swagger) ici :
➡️ http://localhost:4000/api-docs

💻 2. Démarrage du Frontend (streaming/)

Ce service est l'interface utilisateur React qui communique avec le Backend via Axios.

Prérequis

Le serveur Backend (stream-api/) doit être lancé (étape 4 précédente).

Étape 1 : Installation

Ouvrez un NOUVEAU terminal et naviguez vers le dossier streaming/ :

npm install


Étape 2 : Lancement

Lancez l'application de développement Vite :

npm run dev


Le Frontend démarrera sur http://localhost:5174 (ou un port disponible).

Fonctionnalités Clés du Frontend

Authentification : Inscription et Connexion.

Contenu Dynamique : Catalogue de Films et Séries affiché depuis la BDD.

Gestion des Favoris : Ajout/Suppression des médias (via MongoDB).

Panneau Admin : Route protégée (/admin) pour ajouter et supprimer des Films/Séries (via PostgreSQL).

🛠️ Commandes Utiles (pour le Backend)

Commande

Description

npm run dev

Lance le serveur en mode développement (avec nodemon).

npm test

Exécute tous les tests d'intégration (Jest/Supertest).

npx prisma studio

Ouvre l'interface visuelle pour gérer les données PostgreSQL.

npx prisma generate

Met à jour le client Prisma après modification du schéma.
