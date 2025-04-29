import express from 'express';
import { generateMockPets, generateMockUsers } from '../mocking.js';
import { logger } from '../utils/logger.js';
import { UserModel } from '../dao/models/User.js';
import { PetModel } from '../dao/models/Pet.js';

const router = express.Router();

router.get('/mockingpets', (req, res, next) => {
    try {
        const { count } = req.query;
        if (count && (isNaN(count) || count <= 0)) {
            throw new Error('INVALID_DATA');
        }
        logger.info(`Request to /mockingpets with count=${count || 100}`);
        const pets = generateMockPets(Number(count) || 100);
        res.json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
});

router.get('/mockingusers', (req, res, next) => {
    try {
        logger.info('Request to /mockingusers');
        const users = generateMockUsers(50);
        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
});

router.post('/generateData', async (req, res, next) => {
    try {
        const { users, pets } = req.body;
        if (!users || !pets || users < 0 || pets < 0) {
            throw new Error('INVALID_DATA');
        }
        
        logger.info(`Generating ${users} users and ${pets} pets for database`);
        const generatedUsers = generateMockUsers(users);
        const generatedPets = generateMockPets(pets);
        
        await UserModel.insertMany(generatedUsers);
        await PetModel.insertMany(generatedPets);
        
        res.json({ success: true, message: 'Data generated and inserted', users: generatedUsers.length, pets: generatedPets.length });
    } catch (error) {
        next(error);
    }
});

export default router;