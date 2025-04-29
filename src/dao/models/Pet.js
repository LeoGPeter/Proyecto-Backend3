import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    name: String,
    species: String,
    breed: String,
    age: Number,
    adopted: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

export const PetModel = mongoose.model('Pet', PetSchema);
