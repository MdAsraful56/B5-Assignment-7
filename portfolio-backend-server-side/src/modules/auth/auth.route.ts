import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { userLoginZodSchema } from './auth.validation';

const router = Router();

router.post(
    '/login',
    validateRequest(userLoginZodSchema),
    AuthController.UserLogin
);

export const authRouter = router;
