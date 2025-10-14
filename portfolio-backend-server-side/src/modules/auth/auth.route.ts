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

router.post('/google-login', AuthController.AuthWithGoogle);

// router.post('/logout', AuthController.UserLogout);

export const authRouter = router;
