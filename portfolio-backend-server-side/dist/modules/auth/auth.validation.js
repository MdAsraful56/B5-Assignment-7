"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userLoginZodSchema = zod_1.default.object({
    email: zod_1.default.string().email('Invalid email address'),
    password: zod_1.default
        .string()
        .regex(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, 'Password must be at least 8 characters and mixed with at least one uppercase, lowercase and special character.'),
});
