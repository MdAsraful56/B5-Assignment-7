import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../config/db';
import { envVars } from '../../config/env';
import AppError from '../../error/AppError';

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    if (!payload) {
        throw new AppError(404, 'payload not found');
    }

    if (!payload.email) {
        throw new AppError(404, 'email not found');
    }

    const isUserExist = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    let user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    let hashedPassword: string | undefined = undefined;
    if (payload.password) {
        hashedPassword = await bcrypt.hash(
            payload.password,
            Number(envVars.SALT_ROUND)
        );
    }
    if (user) {
        // throw new AppError(409, 'User already exists');
        return user;
    }

    const createUser = await prisma.user.create({
        data: { ...payload, password: hashedPassword },
    });
    return createUser;
};

const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users;
};

const getSingleUser = async (id: number): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
};

const updateUser = async (
    id: number,
    payload: Partial<User>
): Promise<User> => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: payload,
    });
    return updatedUser;
};

const deletedUser = async (id: number): Promise<User> => {
    const deletedUser = await prisma.user.delete({
        where: { id },
    });
    return deletedUser;
};

export const UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deletedUser,
};
