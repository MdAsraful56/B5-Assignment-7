import express from 'express';
import { PostController } from './post.controller';

const route = express.Router();

route.post('/create', PostController.CreatePost);
route.get('/all', PostController.GetAllPosts);
route.get('/:id', PostController.GetSinglePost);
route.patch('/update/:id', PostController.UpdatePost);
route.delete('/delete/:id', PostController.DeletePost);

export const postRoute = route;
