import express from 'express';
import { PetModel } from '../models/Pet.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const pets = await PetModel.find();
        res.json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
});

export default router;