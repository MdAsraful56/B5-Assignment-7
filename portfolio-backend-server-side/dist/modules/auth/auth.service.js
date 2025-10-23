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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const db_1 = require("../../config/db");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../error/AppError"));
const userToken_1 = require("../../utils/userToken");
// user login email and password
const userLogin = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new AppError_1.default(404, 'Invalid credential');
    }
    const existingUser = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        throw new AppError_1.default(400, 'User does not exist with this email.');
    }
    const isPasswordMatchd = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!isPasswordMatchd) {
        throw new AppError_1.default(400, 'Password is not matched.');
    }
    const { password: pas } = existingUser, restUser = __rest(existingUser, ["password"]);
    return restUser;
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, userToken_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    // console.log(refreshToken);
    return newAccessToken;
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id: decodedToken.userId,
        },
    });
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, 
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Old Password dose not match');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUNDS));
    yield db_1.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
});
const authWithGoogle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        user = yield db_1.prisma.user.create({
            data,
        });
    }
    return user;
});
exports.AuthService = {
    userLogin,
    authWithGoogle,
    getNewAccessToken,
    resetPassword,
};
