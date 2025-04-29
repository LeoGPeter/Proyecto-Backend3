import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

export const UserModel = mongoose.model('User', UserSchema);