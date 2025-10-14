import { Request, Response } from 'express';
import catchAsync from '../../utilis/catchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import { AuthService } from './auth.service';

// User credential login
const UserLogin = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.userLogin(res, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User login successful',
        data: result,
    });
});

export const AuthController = {
    UserLogin,
};
