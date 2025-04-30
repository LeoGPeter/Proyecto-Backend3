import * as chai from 'chai';
import supertest from 'supertest';
import { logger } from '../src/utils/logger.js';
import app from '../src/server.js';

const expect = chai.expect;
const request = supertest(app);

describe('User Routes Test', () => {
    const testUser = {
        name: 'Test User',
        email: `testuser${Date.now()}@mail.com`,
        password: 'password123'
    };

    it('Debe registrar un nuevo usuario', async () => {
        try {
            const res = await request.post('/api/users/register').send(testUser);

            expect(res.status).to.equal(201);
            expect(res.body.success).to.be.true;
            expect(res.body.data).to.have.property('_id');
        } catch (err) {
            logger.error(`Test failed: ${err.message}`);
            throw err;
        }
    });

    it('Debe fallar al registrar un usuario ya existente', async () => {
        try {
            const res = await request.post('/api/users/register').send(testUser);

            expect(res.status).to.equal(400);
            expect(res.body.error.message).to.equal('User already exists');
        } catch (err) {
            logger.error(`Test failed: ${err.message}`);
            throw err;
        }
    });
});

