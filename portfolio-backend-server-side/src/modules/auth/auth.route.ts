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

router.get('/me', AuthController.GetLoggedInUser);

router.post('/refresh-token', AuthController.GetNewAccessToken);
router.post('/reset-password', AuthController.ResetPassword);

router.post('/google-login', AuthController.AuthWithGoogle);

router.post('/logout', AuthController.Logout);

export const authRouter = router;
