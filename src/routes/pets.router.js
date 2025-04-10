import express from 'express';
import { PetModel } from '../models/Pet.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Operaciones relacionadas con mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get('/', async (req, res, next) => {
    try {
        const pets = await PetModel.find();
        res.json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
});

export default router;