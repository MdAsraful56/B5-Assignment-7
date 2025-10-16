import { Request, Response } from 'express';
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

export const AuthController = {
    UserLogin,
    AuthWithGoogle,
};
