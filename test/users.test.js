import * as chai from 'chai';
import supertest from 'supertest';
import app from '../src/server.js';

const expect = chai.expect;
const request = supertest(app);

describe('Testing Users Endpoints', () => {
  
  let createdUserEmail = `testuser${Date.now()}@test.com`;
  let createdUserPassword = 'password123';

  it('Debe registrar un nuevo usuario', async () => {
    const response = await request.post('/api/sessions/register').send({
      name: 'Test User',
      email: createdUserEmail,
      password: createdUserPassword
    });

    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Usuario registrado correctamente');
  });

  it('Debe loguear el usuario registrado', async () => {
    const response = await request.post('/api/sessions/login').send({
      email: createdUserEmail,
      password: createdUserPassword
    });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body).to.have.property('token');
  });

  it('Debe obtener todos los usuarios', async () => {
    const response = await request.get('/api/users');

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an('array');
  });

});
