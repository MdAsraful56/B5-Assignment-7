import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(createUserZodSchema),
    UserController.CreateUser
);
router.get('/all', UserController.GetAllUsers);
router.get('/:id', UserController.GetSingleUser);
router.patch(
    '/update/:id',
    validateRequest(updateUserZodSchema),
    UserController.UpdateUser
);
router.delete('/delete/:id', UserController.DeleteUser);

export const userRouter = router;
