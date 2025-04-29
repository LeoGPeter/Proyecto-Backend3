import { PetModel } from '../dao/models/Pet.js';

export const PetService = {
    getAllPets: async () => {
        return await PetModel.find();
    },

    createPet: async (petData) => {
        return await PetModel.create(petData);
    },

    getPetById: async (id) => {
        return await PetModel.findById(id);
    }
};
