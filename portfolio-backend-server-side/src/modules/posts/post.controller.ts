import { Request, Response } from 'express';
import { PostService } from './post.service';

const CreatePost = async (req: Request, res: Response) => {
    try {
        const post = await PostService.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

const GetAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

const GetSinglePost = async (req: Request, res: Response) => {
    try {
        const post = await PostService.getSinglePost(Number(req.params.id));
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
};

const UpdatePost = async (req: Request, res: Response) => {
    try {
        const post = await PostService.updatePost(
            Number(req.params.id),
            req.body
        );
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
};

const DeletePost = async (req: Request, res: Response) => {
    try {
        const post = await PostService.deletePost(Number(req.params.id));
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

export const PostController = {
    CreatePost,
    GetAllPosts,
    GetSinglePost,
    UpdatePost,
    DeletePost,
};
