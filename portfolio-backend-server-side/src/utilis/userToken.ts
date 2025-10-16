import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/db';
import { envVars } from '../config/env';
import AppError from '../error/AppError';
import { IUser, UserStatus } from '../modules/users/user.interface';
import { generateToken, verifyToken } from './jwt';

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateToken(
        jwtPayload,
        envVars.JWT_ACCESS_SECRET,
        envVars.JWT_ACCESS_EXPIRES
    );

    const refreshToken = generateToken(
        jwtPayload,
        envVars.JWT_REFRESH_SECRET,
        envVars.JWT_REFRESH_EXPIRES
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const createNewAccessTokenWithRefreshToken = async (
    refreshToken: string
) => {
    const verifiedRefreshToken = verifyToken(
        refreshToken,
        envVars.JWT_REFRESH_SECRET
    ) as JwtPayload;

    const isUserExist = await prisma.user.findUnique({
        where: {
            email: verifiedRefreshToken.email,
        },
    });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist');
    }
    if (
        isUserExist.status === UserStatus.BLOCKED ||
        isUserExist.status === UserStatus.INACTIVE
    ) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `User is ${isUserExist.status}`
        );
    }

    const JwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = generateToken(
        JwtPayload,
        envVars.JWT_ACCESS_SECRET,
        envVars.JWT_ACCESS_EXPIRES
    );

    return {
        accessToken,
    };
};
