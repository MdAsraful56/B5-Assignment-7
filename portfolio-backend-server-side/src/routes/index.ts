import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { contactRoute } from '../modules/contact/contact.route';
import { postRoute } from '../modules/posts/post.route';
import { projectRouter } from '../modules/project/project.route';
import { userRouter } from '../modules/users/user.route';

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/post',
        route: postRoute,
    },
    {
        path: '/contact',
        route: contactRoute,
    },
    {
        path: '/project',
        route: projectRouter,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
