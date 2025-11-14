const request = require('supertest');
const app = require('../app');
const prisma = require('../config/postgres');
const bcrypt = require('bcrypt');

const { mongoose } = require('../config/mongo'); 


let adminToken;


beforeAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.film.deleteMany({});
  
  const hashedPassword = await bcrypt.hash('adminpass', 10);
  await prisma.user.create({
    data: {
      nom: 'Admin Test',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@test.com',
      password: 'adminpass',
    });
  
  adminToken = loginRes.body.accessToken;
});


afterAll(async () => {
  await prisma.$disconnect();
  await mongoose.disconnect();
});




describe('API des Films - /films', () => {

  
  it('devrait autoriser l\'accès public à GET /films', async () => {
    const res = await request(app).get('/films');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

 
  it('devrait refuser POST /films si aucun token n\'est fourni', async () => {
    const res = await request(app)
      .post('/films')
      .send({
        titre: 'Film sans token',
        description: 'desc',
        categories: ['Test'],
        images: ['test.jpg'],
        dateDeSortie: '2025-01-01T00:00:00.000Z'
      });
    expect(res.statusCode).toEqual(401);
  });

  it('devrait autoriser POST /films avec un token admin valide', async () => {
    const res = await request(app)
      .post('/films')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        titre: 'Film créé par Admin',
        description: 'La description',
        categories: ['Action'],
        images: ['action.jpg'],
        dateDeSortie: '2025-01-01T00:00:00.000Z'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.titre).toBe('Film créé par Admin');
  });

});