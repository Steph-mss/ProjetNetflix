# Documentation de l'API Stream

## API REST

### Authentification

- **POST /auth/register**
  - Corps : `{ "nom": "John Doe", "email": "john.doe@example.com", "password": "password123" }`
  - Réponse : `{ "id": 1, "nom": "John Doe", "email": "john.doe@example.com", ... }`

- **POST /auth/login**
  - Corps : `{ "email": "john.doe@example.com", "password": "password123" }`
  - Réponse : `{ "accessToken": "...", "refreshToken": "..." }`

- **POST /auth/refresh**
    - Corps : `{ "token": "..." }`
    - Réponse : `{ "accessToken": "..." }`

- **GET /auth/me**
    - En-têtes : `Authorization: Bearer <accessToken>`
    - Réponse : `{ "id": 1, "nom": "John Doe", ... }`

### Utilisateurs

- **GET /users**
- **GET /users/:id**
- **PUT /users/:id**
- **DELETE /users/:id**

### Films

- **GET /films**
- **GET /films/:id**
- **POST /films**
- **PUT /films/:id**
- **DELETE /films/:id**

### Séries

- **GET /series**
- **GET /series/:id**
- **POST /series**
- **PUT /series/:id**
- **DELETE /series/:id**

### Favoris

- **GET /favoris/user/:id**
- **POST /favoris**
- **DELETE /favoris/:id**

## API GraphQL

### Requêtes

- `films: [Film]`
- `film(id: Int!): Film`
- `series: [Serie]`
- `serie(id: Int!): Serie`
- `favoris(userId: Int!): [Favori]`

### Mutations

- `addFavori(userId: Int!, type: String!, sqlId: Int!): Favori`
- `removeFavori(id: ID!): Favori`