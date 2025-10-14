import { Post, Prisma } from '@prisma/client';
import { prisma } from '../../config/db';

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    if (!payload) {
        throw new Error('Payload is null to create a post.');
    }

    const post = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return post;
};

const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags,
}: {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    tags?: string[];
}): Promise<{
    data: Post[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}> => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } },
                ],
            },
            typeof isFeatured === 'boolean' && { isFeatured },
            tags && tags.length > 0 && { tags: { hasEvery: tags } },
        ].filter(Boolean),
    };

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const total = await prisma.post.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const getSinglePost = async (id: number): Promise<Post | null> => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
        });

        return await tx.post.findUnique({
            where: { id },
            include: { author: true },
        });
    });
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
