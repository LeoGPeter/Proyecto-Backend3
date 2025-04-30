import * as chai from 'chai';
import supertest from 'supertest';
import app from '../src/server.js';
import { expect } from 'chai';

const request = supertest(app);

describe('Testing Pets Endpoints', () => {
  let createdPetId;
  const petData = {
      name: "Fido",
      species: "Dog",
      breed: "Labrador",
      age: 3,
      adopted: false,
      owner: "6615ccfda0c7bc44b2f8dc5e" // Asegurate que exista en la DB
  };

  it('Debe crear una nueva mascota', async () => {
      const res = await chai.request(app)
          .post('/api/pets')
          .send(petData);

      expect(res.status).to.equal(201);
      expect(res.body.success).to.be.true;
      createdPetId = res.body.data._id;
  });

  it('No debe permitir crear la misma mascota dos veces', async () => {
      const res = await chai.request(app)
          .post('/api/pets')
          .send(petData);

      expect(res.status).to.equal(400);
      expect(res.body.success).to.be.false;
      expect(res.body.error.message).to.equal('Pet with the same name and owner already exists');
  });
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
