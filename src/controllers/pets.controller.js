import { PetModel } from '../dao/models/Pet.js';
import { PetService } from '../services/pets.service.js';
import {CustomError} from '../utils/customError.js'

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
        const { name, species, breed, age, adopted, owner } = req.body;

        if (!name || !species || !breed || age == null) {
            throw new CustomError('MISSING_PARAMETERS');
        }

        const existingPet = await PetModel.findOne({ name, species, owner });

        if (existingPet) {
            throw new CustomError('PET_ALREADY_EXISTS');
        }

        const newPet = new PetModel({ name, species, breed, age, adopted, owner });
        const savedPet = await newPet.save();

        res.status(201).json({ success: true, data: savedPet });
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
