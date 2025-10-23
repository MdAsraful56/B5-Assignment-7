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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const post_service_1 = require("./post.service");
const CreatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_service_1.PostService.createPost(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to create post',
            data: null,
        });
    }
}));
const GetAllPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || '';
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
            : undefined;
        const tags = req.query.tags
            ? req.query.tags.split(',')
            : [];
        const result = yield post_service_1.PostService.getAllPosts({
            page,
            limit,
            search,
            isFeatured,
            tags,
        });
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Posts retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to fetch posts',
            data: null,
        });
    }
}));
const GetSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_service_1.PostService.getSinglePost(Number(req.params.id));
        if (post) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 200,
                success: true,
                message: 'Post retrieved successfully',
                data: post,
            });
        }
        else {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 404,
                success: false,
                message: 'Post not found',
                data: null,
            });
        }
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve post',
            data: null,
        });
    }
}));
const UpdatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_service_1.PostService.updatePost(Number(req.params.id), req.body);
        if (post) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 200,
                success: true,
                message: 'Post updated successfully',
                data: post,
            });
        }
        else {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 404,
                success: false,
                message: 'Post not found',
                data: null,
            });
        }
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to update post',
            data: null,
        });
    }
}));
const DeletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const post = yield post_service_1.PostService.deletePost(Number(req.params.id));
            if (post) {
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: 200,
                    success: true,
                    message: 'Post deleted successfully',
                    data: post,
                });
            }
            else {
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: 404,
                    success: false,
                    message: 'Post not found',
                    data: null,
                });
            }
        }
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to delete post',
            data: null,
        });
    }
}));
exports.PostController = {
    CreatePost,
    GetAllPosts,
    GetSinglePost,
    UpdatePost,
    DeletePost,
};
