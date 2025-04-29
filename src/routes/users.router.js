import express from 'express';
import { UserModel } from '../dao/models/User.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
});

export default router;