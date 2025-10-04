import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create', UserController.CreateUser);
router.get('/all', UserController.GetAllUsers);
router.get('/:id', UserController.GetSingleUser);
router.patch('/update/:id', UserController.UpdateUser);
router.delete('/delete/:id', UserController.DeleteUser);

export const userRouter = router;
