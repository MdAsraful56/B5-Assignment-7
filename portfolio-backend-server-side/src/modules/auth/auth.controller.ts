import { Request, Response } from 'express';
import catchAsync from '../../utilis/catchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import { AuthService } from './auth.service';

// User credential login
const UserLogin = catchAsync(async (req: Request, res: Response) => {
    try {
        const result = await AuthService.userLogin(res, req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User login successful',
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
