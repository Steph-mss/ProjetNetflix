const request = require('supertest');
const app = require('../app');
const prisma = require('../config/postgres');

const { mongoose } = require('../config/mongo'); 




beforeEach(async () => {
  await prisma.user.deleteMany({});
});


afterAll(async () => {
  await prisma.$disconnect();
  await mongoose.disconnect(); 
});




describe('POST /auth/register', () => {
  
  it('devrait créer un nouvel utilisateur et renvoyer 201', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nom: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toBe('test@example.com');
  });

  it('devrait refuser l\'inscription si l\'email est manquant (validation)', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nom: 'Test User 2',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400); 
  });
});



describe('POST /auth/login', () => {
  
  beforeEach(async () => {
    await request(app)
      .post('/auth/register')
      .send({
        nom: 'Login User',
        email: 'login@example.com',
        password: 'password123'
      });
  });

  it('devrait connecter un utilisateur existant et renvoyer un token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('devrait refuser la connexion avec un mauvais mot de passe', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401); 
  });
});