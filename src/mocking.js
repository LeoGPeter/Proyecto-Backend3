import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { logger } from './utils/logger.js';

export const generateMockPets = (count = 100) => {
    logger.debug(`Generating ${count} mock pets`);
    return Array.from({ length: count }, () => ({
        name: faker.person.firstName(),
        species: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
        adopted: false,
        owner: null
    }));
};

export const generateMockUsers = (count = 50) => {
    logger.debug(`Generating ${count} mock users`);
    const hashedPassword = bcrypt.hashSync('coder123', 10);
    return Array.from({ length: count }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    }));
};