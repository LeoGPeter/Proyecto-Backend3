import bcrypt from 'bcrypt';
import { UserModel } from '../dao/models/User.js';
import {
    getUsersService,
    registerUserService,
    loginUserService
} from '../services/users.service.js';
import { CustomError } from '../utils/customError.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsersService();
        res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw CustomError('MISSING_PARAMETERS');
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new CustomError('USER_ALREADY_EXISTS');

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            pets: []
        });

        res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const user = await loginUserService(req.body);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
