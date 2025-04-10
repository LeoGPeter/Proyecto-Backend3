import express from 'express';
import { AdoptionModel } from '../models/Adoption.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Registrar una adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopción registrada exitosamente
 */
router.post('/', async (req, res, next) => {
    try {
        const { userId, petId } = req.body;
        const adoption = new AdoptionModel({ userId, petId });
        await adoption.save();
        res.status(201).json({ success: true, data: adoption });
    } catch (error) {
        next(error);
    }
});

export default router;