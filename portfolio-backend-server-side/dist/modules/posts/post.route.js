"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const route = express_1.default.Router();
route.post('/create', post_controller_1.PostController.CreatePost);
route.get('/all', post_controller_1.PostController.GetAllPosts);
route.get('/:id', post_controller_1.PostController.GetSinglePost);
route.patch('/update/:id', post_controller_1.PostController.UpdatePost);
route.delete('/delete/:id', post_controller_1.PostController.DeletePost);
exports.postRoute = route;
