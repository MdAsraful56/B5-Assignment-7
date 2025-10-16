import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserService } from './user.service';

const CreateUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User Created Successfully',
            data: user,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to create user',
            data: null,
        });
    }
});

const GetAllUsers = catchAsync(async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve users',
            data: null,
        });
    }
});

const GetSingleUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const user = await UserService.getSingleUser(Number(req.params.id));
        if (!user) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User not found',
                data: null,
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve user',
            data: null,
        });
    }
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const updatedUser = await UserService.updateUser(
            Number(req.params.id),
            req.body
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to update user',
            data: null,
        });
    }
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const deletedUser = await UserService.deletedUser(
            Number(req.params.id)
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to delete user',
            data: null,
        });
    }
});

export const UserController = {
    CreateUser,
    GetAllUsers,
    GetSingleUser,
    UpdateUser,
    DeleteUser,
};
