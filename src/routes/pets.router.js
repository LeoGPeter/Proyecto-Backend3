import express from 'express';
import { getAllPets, createPet, getPetById } from '../controllers/pets.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Operaciones relacionadas con mascotas
 */

// GET all pets
router.get('/', getAllPets);

// POST create a pet
router.post('/', createPet);

// GET pet by ID
router.get('/:id', getPetById);

export default router;
