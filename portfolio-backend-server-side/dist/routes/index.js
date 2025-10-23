"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const contact_route_1 = require("../modules/contact/contact.route");
const post_route_1 = require("../modules/posts/post.route");
const project_route_1 = require("../modules/project/project.route");
const user_route_1 = require("../modules/users/user.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
    {
        path: '/post',
        route: post_route_1.postRoute,
    },
    {
        path: '/contact',
        route: contact_route_1.contactRoute,
    },
    {
        path: '/project',
        route: project_route_1.projectRouter,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
