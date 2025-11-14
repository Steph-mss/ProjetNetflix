# API Netflix Stream - Requêtes Postman

Ce document fournit une collection de requêtes API pour l'API Netflix Stream, formatée pour une utilisation facile avec Postman.

## Configuration

Il est recommandé de configurer un environnement Postman avec la variable suivante :

- `base_url` : L'URL de base de votre API (par exemple, `http://localhost:4000`)

## Authentification

### 1. Enregistrer un nouvel utilisateur

- **Méthode :** `POST`
- **URL :** `{{base_url}}/auth/register`
- **En-têtes :**
  - `Content-Type` : `application/json`
- **Corps :**

```json
{
  "nom": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### 2. Connexion

- **Méthode :** `POST`
- **URL :** `{{base_url}}/auth/login`
- **En-têtes :**
  - `Content-Type` : `application/json`
- **Corps :**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### 3. Rafraîchir le jeton

- **Méthode :** `POST`
- **URL :** `{{base_url}}/auth/refresh`
- **En-têtes :**
  - `Content-Type` : `application/json`
- **Corps :**

```json
{
  "token": "votre_jeton_de_rafraichissement"
}
```

### 4. Obtenir l'utilisateur actuel

- **Méthode :** `GET`
- **URL :** `{{base_url}}/auth/me`
- **En-têtes :**
  - `Authorization` : `Bearer {{access_token}}`

---

## Films

### 1. Obtenir tous les films

- **Méthode :** `GET`
- **URL :** `{{base_url}}/films`

### 2. Obtenir un film par ID

- **Méthode :** `GET`
- **URL :** `{{base_url}}/films/1`

### 3. Créer un nouveau film (Admin)

- **Méthode :** `POST`
- **URL :** `{{base_url}}/films`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{admin_access_token}}`
- **Corps :**

```json
{
  "titre": "Inception",
  "description": "Un voleur qui dérobe des secrets d'entreprise grâce à la technologie de partage de rêves est chargé de la tâche inverse : implanter une idée dans l'esprit d'un PDG.",
  "categories": ["Science-Fiction", "Thriller"],
  "images": [
    "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  ],
  "dateDeSortie": "2010-07-16T00:00:00.000Z"
}
```

### 4. Mettre à jour un film (Admin)

- **Méthode :** `PUT`
- **URL :** `{{base_url}}/films/1`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{admin_access_token}}`
- **Corps :**

```json
{
  "titre": "Inception 2",
  "description": "L'histoire continue.",
  "categories": ["Science-Fiction", "Thriller", "Action"],
  "images": [
    "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  ],
  "dateDeSortie": "2025-07-16T00:00:00.000Z"
}
```

### 5. Supprimer un film (Admin)

- **Méthode :** `DELETE`
- **URL :** `{{base_url}}/films/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{admin_access_token}}`

---

## Séries

### 1. Obtenir toutes les séries

- **Méthode :** `GET`
- **URL :** `{{base_url}}/series`

### 2. Obtenir une série par ID

- **Méthode :** `GET`
- **URL :** `{{base_url}}/series/1`

### 3. Créer une nouvelle série (Admin)

- **Méthode :** `POST`
- **URL :** `{{base_url}}/series`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{admin_access_token}}`
- **Corps :**

```json
{
  "titre": "Breaking Bad",
  "description": "Un professeur de chimie de lycée diagnostiqué d'un cancer du poumon inopérable se tourne vers la fabrication et la vente de méthamphétamine afin d'assurer l'avenir de sa famille.",
  "categories": ["Crime", "Drame", "Thriller"],
  "images": [
    "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
  ],
  "dateDeSortie": "2008-01-20T00:00:00.000Z"
}
```

### 4. Mettre à jour une série (Admin)

- **Méthode :** `PUT`
- **URL :** `{{base_url}}/series/1`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{admin_access_token}}`
- **Corps :**

```json
{
  "titre": "Breaking Bad: Le Retour",
  "description": "Il est de retour.",
  "categories": ["Crime", "Drame", "Thriller"],
  "images": [
    "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
  ],
  "dateDeSortie": "2026-01-20T00:00:00.000Z"
}
```

### 5. Supprimer une série (Admin)

- **Méthode :** `DELETE`
- **URL :** `{{base_url}}/series/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{admin_access_token}}`

---

## Utilisateurs (Admin)

### 1. Obtenir tous les utilisateurs

- **Méthode :** `GET`
- **URL :** `{{base_url}}/users`
- **En-têtes :**
  - `Authorization` : `Bearer {{admin_access_token}}`

### 2. Obtenir un utilisateur par ID

- **Méthode :** `GET`
- **URL :** `{{base_url}}/users/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{admin_access_token}}`

### 3. Mettre à jour un utilisateur

- **Méthode :** `PUT`
- **URL :** `{{base_url}}/users/1`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{admin_access_token}}`
- **Corps :**

```json
{
  "nom": "John Doe Mis à jour",
  "email": "john.doe.updated@example.com",
  "role": "user"
}
```

### 4. Supprimer un utilisateur

- **Méthode :** `DELETE`
- **URL :** `{{base_url}}/users/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{admin_access_token}}`

---

## Favoris

### 1. Obtenir les favoris de l'utilisateur

- **Méthode :** `GET`
- **URL :** `{{base_url}}/favoris/user/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{access_token}}`

### 2. Ajouter un favori

- **Méthode :** `POST`
- **URL :** `{{base_url}}/favoris`
- **En-têtes :**
  - `Content-Type` : `application/json`
  - `Authorization` : `Bearer {{access_token}}`
- **Corps :**

```json
{
  "userId": 1,
  "mediaId": 1,
  "mediaType": "film"
}
```

### 3. Supprimer un favori

- **Méthode :** `DELETE`
- **URL :** `{{base_url}}/favoris/1`
- **En-têtes :**
  - `Authorization` : `Bearer {{access_token}}`