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
exports.AuthController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const setCookies_1 = require("../../utils/setCookies");
const userToken_1 = require("../../utils/userToken");
const auth_service_1 = require("./auth.service");
// User credential login
const UserLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const result = yield auth_service_1.AuthService.userLogin(res, req.body);
        // Create tokens
        // ensure nullable fields are converted to undefined to satisfy Partial<IUser>
        const safeUser = Object.assign(Object.assign({}, result), { picture: (_a = result.picture) !== null && _a !== void 0 ? _a : undefined, phone: (_b = result.phone) !== null && _b !== void 0 ? _b : undefined, provider: (_c = result.provider) !== null && _c !== void 0 ? _c : undefined });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // cast to any to avoid enum type mismatch between Role and UserRole
        const tokens = (0, userToken_1.createUserTokens)(safeUser);
        // Set cookies
        (0, setCookies_1.setAuthCookies)(res, tokens);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: 'User login successful',
            data: {
                user: result,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
}));
const AuthWithGoogle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthService.authWithGoogle(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: 'User authenticated with Google successfully',
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
}));
const Logout = (0, catchAsync_1.default)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User logout  Successfully',
        data: null,
    });
}));
const GetNewAccessToken = (0, catchAsync_1.default)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken);
    if (!refreshToken) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'No refresh Token is resived cookies.');
    }
    const tokenInfo = yield auth_service_1.AuthService.getNewAccessToken(refreshToken);
    (0, setCookies_1.setAuthCookies)(res, tokenInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'New Access token Retrived Successfully',
        data: tokenInfo,
    });
}));
const ResetPassword = (0, catchAsync_1.default)((req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    // console.log(decodedToken);
    if (!decodedToken) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'User token is missing or invalid.');
    }
    yield auth_service_1.AuthService.resetPassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User Password Change  Successfully',
        data: null,
    });
}));
const GetLoggedInUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'User not logged in');
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Logged in user retrieved successfully',
        data: user,
    });
}));
exports.AuthController = {
    UserLogin,
    AuthWithGoogle,
    Logout,
    GetLoggedInUser,
    GetNewAccessToken,
    ResetPassword,
};
