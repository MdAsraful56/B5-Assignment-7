import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { setAuthCookies } from '../../utils/setCookies';
import { createUserTokens } from '../../utils/userToken';
import { AuthService } from './auth.service';

// User credential login
const UserLogin = catchAsync(async (req: Request, res: Response) => {
    try {
        const result = await AuthService.userLogin(
            res as unknown as any,
            req.body
        );

        // Create tokens
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tokens = createUserTokens(result);

        // Set cookies
        setAuthCookies(res, tokens);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User login successful',
            data: {
                user: result,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const AuthWithGoogle = catchAsync(async (req: Request, res: Response) => {
    try {
        const result = await AuthService.authWithGoogle(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User authenticated with Google successfully',
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const Logout = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User logout  Successfully',
            data: null,
        });
    }
);

const GetNewAccessToken = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;

        // console.log(refreshToken);

        if (!refreshToken) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'No refresh Token is resived cookies.'
            );
        }

        const tokenInfo = await AuthService.getNewAccessToken(refreshToken);

        setAuthCookies(res, tokenInfo);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'New Access token Retrived Successfully',
            data: tokenInfo,
        });
    }
);

const ResetPassword = catchAsync(
    async (
        req: Request & { user?: JwtPayload },
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) => {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const decodedToken = req.user;
        console.log(decodedToken);

        if (!decodedToken) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'User token is missing or invalid.'
            );
        }

        await AuthService.resetPassword(oldPassword, newPassword, decodedToken);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User Password Change  Successfully',
            data: null,
        });
    }
);

const GetLoggedInUser = catchAsync(
    async (req: Request & { user?: JwtPayload }, res: Response) => {
        const user = req.user;
        console.log(user);

        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'User not logged in');
        }

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Logged in user retrieved successfully',
            data: user,
        });
    }
);

export const AuthController = {
    UserLogin,
    AuthWithGoogle,
    Logout,
    GetLoggedInUser,
    GetNewAccessToken,
    ResetPassword,
};
