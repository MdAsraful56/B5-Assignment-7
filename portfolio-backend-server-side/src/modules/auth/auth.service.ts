import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../config/db';
import AppError from '../../error/AppError';
import { IUser } from '../users/user.interface';

// user login email and password
const userLogin = async (res: Response, payload: Partial<IUser>) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(404, 'Invalid credential');
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        throw new AppError(400, 'User does not exist with this email.');
    }

    const isPasswordMatchd = await bcrypt.compare(
        password as string,
        existingUser.password as string
    );

    if (!isPasswordMatchd) {
        throw new AppError(400, 'Password is not matched.');
    }

    const { password: pas, ...restUser } = existingUser;

    return restUser;
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        user = await prisma.user.create({
            data,
        });
    }

    return user;
};

export const AuthService = {
    userLogin,
    authWithGoogle,
};
