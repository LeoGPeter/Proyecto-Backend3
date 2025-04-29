import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { UserModel } from '../dao/models/User.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'supersecreta123';

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Manejo de sesiones de usuario
 */

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
 */

router.post(
    '/register',
    [
      body('name').notEmpty().withMessage('El nombre es obligatorio'),
      body('email').isEmail().withMessage('Debe ser un email válido'),
      body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }
  
        const { name, email, password, role } = req.body;
  
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new UserModel({
          name,
          email,
          password: hashedPassword,
          role: role || 'user',
          pets: []
        });
  
        await newUser.save();
  
        res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Debe ingresar un email válido'),
      body('password').notEmpty().withMessage('Debe ingresar una contraseña'),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }
  
        const { email, password } = req.body;
  
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
  
        const token = jwt.sign(
          { id: user._id, role: user.role, email: user.email },
          process.env.JWT_SECRET || 'supersecreta123',
          { expiresIn: '2h' }
        );
  
        res.json({ success: true, message: 'Login exitoso', token });
      } catch (error) {
        next(error);
      }
    }
  );

export default router;
