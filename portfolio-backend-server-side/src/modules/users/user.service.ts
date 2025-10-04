import { Prisma, User } from '@prisma/client';
import { prisma } from '../../config/db';

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createUser = await prisma.user.create({
        data: payload,
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
