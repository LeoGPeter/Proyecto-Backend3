import bcrypt from 'bcrypt';
import { UserModel } from '../dao/models/User.js';
import { CustomError } from '../utils/customError.js';

export const getUsersService = async () => {
    return await UserModel.find();
};

export const registerUserService = async ({ name, email, password, role }) => {
    const exists = await UserModel.findOne({ email });
    if (exists) {
        throw new CustomError(4001, 'El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        pets: []
    });
};

export const loginUserService = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new CustomError(4002, 'Usuario no encontrado');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new CustomError(4003, 'Contraseña incorrecta');
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};
