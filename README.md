# 🎬 MoovFlix – Plateforme de Streaming Animée

MoovFlix est une plateforme de streaming inspirée de Netflix, développée dans le cadre du TP de Développement Back-End à l’Efrei par **Jawad Labed** et **Steven Simonis**.

Le projet repose sur une architecture moderne composée d’un **Frontend React/Vite** et d’un **Backend Node.js/Express/Prisma**, offrant une expérience complète : authentification, gestion du catalogue, favoris, et administration.

---

## ⚙️ Architecture du Projet

La structure du projet est organisée autour de deux dossiers principaux :

```
Backend/     → Backend (Node.js, Express, Prisma, MongoDB)
Frontend/      → Frontend (React, Vite)
```

---

# 🚀 1. Backend – `Backend/`

Le Backend gère :

* L’authentification (JWT)
* Les données (Films, Séries, Utilisateurs) via **PostgreSQL + Prisma**
* Les favoris via **MongoDB + Mongoose**
* La documentation API via **Swagger**
* Une API **REST** & **GraphQL**

---

## 📦 Prérequis

* **Node.js 18+**
* **PostgreSQL** en cours d'exécution
* **MongoDB** en cours d'exécution
* Un fichier **`.env`** configuré (voir ci-dessous)

---

## 🔧 Étape 1 : Installation

Dans le dossier `backend/` :

```bash
npm install
```

---

## 🗃️ Étape 2 : Configuration du fichier `.env`

Créez un fichier `.env` à la racine de `Backend/` :

```
# --- Base de données PostgreSQL (Prisma) ---
DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[NOM_BDD]?schema=public"

# --- Base de données MongoDB (Mongoose) ---
MONGO_URL="mongodb://localhost:27017/animeflix_db"

# --- JWT (sécurité) ---
JWT_SECRET="VOTRE_CLE_SECRETE_POUR_ACCESS_TOKEN"
JWT_EXPIRES_IN="1h"

JWT_REFRESH_SECRET="VOTRE_CLE_SECRETE_POUR_REFRESH_TOKEN"
JWT_REFRESH_EXPIRES_IN="7d"
```

---

## 🧱 Étape 3 : Migration Prisma

Initialisez le schéma PostgreSQL :

```bash
npx prisma migrate dev
npx prisma generate
```

---

## ▶️ Étape 4 : Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur :
👉 **[http://localhost:4000](http://localhost:4000)**

Documentation Swagger :
👉 **[http://localhost:4000/api-docs](http://localhost:4000/api-docs)**

---

# 💻 2. Frontend – `Frontend/`

Le Frontend est développé avec **React + Vite** et communique avec l’API via **Axios**.

---

## 📦 Prérequis

* Le Backend doit être lancé (voir étape précédente)

---

## 🔧 Étape 1 : Installation

Dans un nouveau terminal, positionnez-vous dans `streaming/` :

```bash
npm install
```

---

## ▶️ Étape 2 : Lancement du Frontend

```bash
npm run dev
```

L’application démarre sur :
👉 **[http://localhost:5174](http://localhost:5174)** (ou un autre port disponible)

---

## ✨ Fonctionnalités principales du Frontend

* 🔐 **Authentification** : inscription & connexion
* 🎞️ **Catalogue dynamique** des films et séries depuis PostgreSQL
* ⭐ **Gestion des Favoris** (ajout / suppression via MongoDB)
* 🛡️ **Panneau Admin** (`/admin`) :

  * Ajouter / supprimer Films & Séries
  * Routes sécurisées

---

# 🛠️ Commandes Utiles (Backend)

| Commande              | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Lance le serveur en mode développement (nodemon)         |
| `npm test`            | Exécute les tests Jest/Supertest                         |
| `npx prisma studio`   | Ouvre l’interface visuelle de gestion PostgreSQL         |
| `npx prisma generate` | Met à jour le client Prisma après modification du schéma |

---

# 📚 Technologies Utilisées

### Backend

* Node.js / Express
* PostgreSQL / Prisma
* MongoDB / Mongoose
* JWT Auth
* Swagger
* GraphQL

### Frontend

* React
* Vite
* Axios
* React Router



