import express from 'express';
import { UserController } from '../users/user.controller';

const route = express.Router();

route.post('/create', UserController.CreateUser);
route.get('/all', UserController.GetAllUsers);
route.get('/:id', UserController.GetSingleUser);
route.patch('/update/:id', UserController.UpdateUser);
route.delete('/delete/:id', UserController.DeleteUser);

export const postRoute = route;
