import * as chai from 'chai';
import supertest from 'supertest';
import app from '../src/server.js';

const expect = chai.expect;
const request = supertest(app);

describe('Testing Pets Endpoints', () => {

  let petId = null; // Guardamos el ID de la mascota creada

  it('Debe crear una nueva mascota', async () => {
    const response = await request.post('/api/pets').send({
      name: 'Firulais',
      specie: 'Perro',
      age: 3,
      adopted: false
    });

    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.have.property('_id');

    petId = response.body.data._id;
  });

  it('Debe obtener todas las mascotas', async () => {
    const response = await request.get('/api/pets');

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an('array');
  });

  it('Debe obtener la mascota creada por ID', async () => {
    const response = await request.get(`/api/pets/${petId}`);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.have.property('name', 'Firulais');
  });

});
