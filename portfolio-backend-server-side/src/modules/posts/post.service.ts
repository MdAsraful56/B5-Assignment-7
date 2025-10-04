import { Post, Prisma } from '@prisma/client';
import { prisma } from '../../config/db';

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    console.log(payload, 'payload from service');
    const post = await prisma.post.create({
        data: payload,
    });
    console.log(post, 'post from service');
    return post;
};

const getAllPosts = async (): Promise<Post[]> => {
    const posts = await prisma.post.findMany();
    return posts;
};

const getSinglePost = async (id: number): Promise<Post | null> => {
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return post;
};

const updatePost = async (
    id: number,
    payload: Prisma.PostUpdateInput
): Promise<Post | null> => {
    const post = await prisma.post.update({
        where: { id },
        data: payload,
    });
    return post;
};

const deletePost = async (id: number): Promise<Post | null> => {
    const post = await prisma.post.delete({
        where: { id },
    });
    return post;
};

export const PostService = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
};
