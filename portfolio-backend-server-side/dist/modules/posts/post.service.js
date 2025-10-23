"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const db_1 = require("../../config/db");
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new Error('Payload is null to create a post.');
    }
    const post = yield db_1.prisma.post.create({
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
});
const getAllPosts = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search, isFeatured, tags, }) {
    const skip = (page - 1) * limit;
    const where = {
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
    const result = yield db_1.prisma.post.findMany({
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
    const total = yield db_1.prisma.post.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return yield tx.post.findUnique({
            where: { id },
            include: { author: true },
        });
    }));
});
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.prisma.post.update({
        where: { id },
        data: payload,
    });
    return post;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.prisma.post.delete({
        where: { id },
    });
    return post;
});
exports.PostService = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
};
