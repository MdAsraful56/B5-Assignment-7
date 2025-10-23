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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../error/AppError"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new AppError_1.default(404, 'payload not found');
    }
    if (!payload.email) {
        throw new AppError_1.default(404, 'email not found');
    }
    const isUserExist = yield db_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    let user = yield db_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    let hashedPassword = undefined;
    if (payload.password) {
        hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(env_1.envVars.SALT_ROUND));
    }
    if (user) {
        // throw new AppError(409, 'User already exists');
        return user;
    }
    const createUser = yield db_1.prisma.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
    });
    return createUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.prisma.user.findMany();
    return users;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: { id },
    });
    return user;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield db_1.prisma.user.update({
        where: { id },
        data: payload,
    });
    return updatedUser;
});
const deletedUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield db_1.prisma.user.delete({
        where: { id },
    });
    return deletedUser;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deletedUser,
};
