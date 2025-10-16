import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PostService } from './post.service';

const CreatePost = catchAsync(async (req: Request, res: Response) => {
    try {
        const post = await PostService.createPost(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to create post',
            data: null,
        });
    }
});

const GetAllPosts = catchAsync(async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || '';
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
            : undefined;
        const tags = req.query.tags
            ? (req.query.tags as string).split(',')
            : [];

        const result = await PostService.getAllPosts({
            page,
            limit,
            search,
            isFeatured,
            tags,
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Posts retrieved successfully',
            data: result,
        });
    } catch (err) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to fetch posts',
            data: null,
        });
    }
});

const GetSinglePost = catchAsync(async (req: Request, res: Response) => {
    try {
        const post = await PostService.getSinglePost(Number(req.params.id));
        if (post) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Post retrieved successfully',
                data: post,
            });
        } else {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Post not found',
                data: null,
            });
        }
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve post',
            data: null,
        });
    }
});

const UpdatePost = catchAsync(async (req: Request, res: Response) => {
    try {
        const post = await PostService.updatePost(
            Number(req.params.id),
            req.body
        );
        if (post) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Post updated successfully',
                data: post,
            });
        } else {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Post not found',
                data: null,
            });
        }
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to update post',
            data: null,
        });
    }
});

const DeletePost = catchAsync(async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const post = await PostService.deletePost(Number(req.params.id));
            if (post) {
                sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'Post deleted successfully',
                    data: post,
                });
            } else {
                sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: 'Post not found',
                    data: null,
                });
            }
        }
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to delete post',
            data: null,
        });
    }
});

export const PostController = {
    CreatePost,
    GetAllPosts,
    GetSinglePost,
    UpdatePost,
    DeletePost,
};
