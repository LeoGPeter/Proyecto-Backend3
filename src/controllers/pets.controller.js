import { PetService } from '../services/pets.service.js';

export const getAllPets = async (req, res, next) => {
    try {
        const pets = await PetService.getAllPets();
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
};

export const createPet = async (req, res, next) => {
    try {
        const pet = await PetService.createPet(req.body);
        res.status(201).json({ success: true, data: pet });
    } catch (error) {
        next(error);
    }
};

export const getPetById = async (req, res, next) => {
    try {
        const pet = await PetService.getPetById(req.params.id);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        next(error);
    }
};
