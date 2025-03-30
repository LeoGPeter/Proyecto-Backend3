import express from 'express';
import { UserModel } from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
});

export default router;