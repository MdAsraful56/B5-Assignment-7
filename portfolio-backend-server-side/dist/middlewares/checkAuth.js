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
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_interface_1 = require("../modules/users/user.interface");
const jwt_1 = require("../utils/jwt");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken) {
            throw new AppError_1.default(403, 'No Token Recieved');
        }
        // const verifiedToken = jwt.verify(accessToken, 'secretOrPrivateKey');
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        const isUserExist = yield db_1.prisma.user.findUnique({
            where: {
                email: verifiedToken.email,
            },
        });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User does not exist');
        }
        if (isUserExist.status === user_interface_1.UserStatus.BLOCKED ||
            isUserExist.status === user_interface_1.UserStatus.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isUserExist.status}`);
        }
        if (!verifiedToken) {
            throw new AppError_1.default(403, 'You are not Authorized');
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(403, 'You are not Permited to view this route!!!');
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
