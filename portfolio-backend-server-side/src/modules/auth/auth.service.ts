import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../config/db';
import { envVars } from '../../config/env';
import AppError from '../../error/AppError';
import { createNewAccessTokenWithRefreshToken } from '../../utils/userToken';
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

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(
        refreshToken
    );
    // console.log(refreshToken);

    return newAccessToken;
};

const resetPassword = async (
    oldPassword: string,
    newPassword: string,
    decodedToken: JwtPayload
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: decodedToken.userId,
        },
    });

    const isOldPasswordMatch = await bcryptjs.compare(
        oldPassword,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user!.password as string
    );

    if (!isOldPasswordMatch) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Old Password dose not match'
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hashedPassword = await bcryptjs.hash(
        newPassword,
        Number(envVars.BCRYPT_SALT_ROUNDS)
    );

    await prisma.user.update({
        where: { id: user!.id },
        data: { password: hashedPassword },
    });
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
    getNewAccessToken,
    resetPassword,
};
