import { Request, Response } from 'express';
import { UserService } from './user.service';

const CreateUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const GetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const GetSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getSingleUser(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const UpdateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await UserService.updateUser(
            Number(req.params.id),
            req.body
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const DeleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await UserService.deletedUser(
            Number(req.params.id)
        );
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export const UserController = {
    CreateUser,
    GetAllUsers,
    GetSingleUser,
    UpdateUser,
    DeleteUser,
};
