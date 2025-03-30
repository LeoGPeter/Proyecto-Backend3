import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: Number,
    adopted: Boolean,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

export const PetModel = mongoose.model('Pet', PetSchema);