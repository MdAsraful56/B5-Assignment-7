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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const CreateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.createUser(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: 'User Created Successfully',
            data: user,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to create user',
            data: null,
        });
    }
}));
const GetAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUsers();
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve users',
            data: null,
        });
    }
}));
const GetSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.getSingleUser(Number(req.params.id));
        if (!user) {
            return (0, sendResponse_1.sendResponse)(res, {
                statusCode: 404,
                success: false,
                message: 'User not found',
                data: null,
            });
        }
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'User retrieved successfully',
            data: user,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to retrieve user',
            data: null,
        });
    }
}));
const UpdateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_service_1.UserService.updateUser(Number(req.params.id), req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to update user',
            data: null,
        });
    }
}));
const DeleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_service_1.UserService.deletedUser(Number(req.params.id));
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to delete user',
            data: null,
        });
    }
}));
exports.UserController = {
    CreateUser,
    GetAllUsers,
    GetSingleUser,
    UpdateUser,
    DeleteUser,
};
