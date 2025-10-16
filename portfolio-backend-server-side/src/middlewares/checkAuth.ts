import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/db';
import { envVars } from '../config/env';
import AppError from '../error/AppError';
import { UserStatus } from '../modules/users/user.interface';
import { verifyToken } from '../utils/jwt';

export const checkAuth =
    (...authRoles: string[]) =>
    async (
        req: Request & { user?: JwtPayload },
        res: Response,
        next: NextFunction
    ) => {
        try {
            const accessToken =
                req.headers.authorization || req.cookies.accessToken;

            if (!accessToken) {
                throw new AppError(403, 'No Token Recieved');
            }

            // const verifiedToken = jwt.verify(accessToken, 'secretOrPrivateKey');

            const verifiedToken = verifyToken(
                accessToken,
                envVars.JWT_ACCESS_SECRET
            ) as JwtPayload;

            const isUserExist = await prisma.user.findUnique({
                where: {
                    email: verifiedToken.email,
                },
            });

            if (!isUserExist) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'User does not exist'
                );
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

            if (!verifiedToken) {
                throw new AppError(403, 'You are not Authorized');
            }

            if (!authRoles.includes(verifiedToken.role)) {
                throw new AppError(
                    403,
                    'You are not Permited to view this route!!!'
                );
            }
            req.user = verifiedToken;
            next();
        } catch (error) {
            next(error);
        }
    };
