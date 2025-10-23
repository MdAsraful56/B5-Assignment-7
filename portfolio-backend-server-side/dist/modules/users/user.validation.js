"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" }),
    email: zod_1.default
        .string({ message: 'Email must be string.' })
        .email({ message: 'Invalid email adderss formet.' })
        .min(5, { message: 'at laest 5 characters long' })
        .max(100, { message: "It's too long" }),
    role: zod_1.default.enum(Object.values(user_interface_1.UserRole)).optional(),
    password: zod_1.default
        .string({ error: 'Password must be string' })
        .min(8, {
        message: 'Password must be at least 8 characters long',
    })
        .regex(/[A-Z]/, {
        message: 'Must include at least one uppercase letter',
    })
        .regex(/[a-z]/, {
        message: 'Must include at least one lowercase letter',
    })
        .regex(/[0-9]/, { message: 'Must include at least one number' })
        .regex(/[@$!%*?&]/, {
        message: 'Must include at least one special character',
    })
        .optional(),
    phone: zod_1.default
        .string({ error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
        message: 'Only valid for Bangladesh. Format: +8801 or 01',
    })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: 'Name must be string.' })
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" })
        .optional(),
    password: zod_1.default
        .string({ error: 'Password must be string' })
        .min(8, {
        message: 'Password must be at least 8 characters long',
    })
        .regex(/[A-Z]/, {
        message: 'Must include at least one uppercase letter',
    })
        .regex(/[a-z]/, {
        message: 'Must include at least one lowercase letter',
    })
        .regex(/[0-9]/, { message: 'Must include at least one number' })
        .regex(/[@$!%*?&]/, {
        message: 'Must include at least one special character',
    })
        .optional(),
    phone: zod_1.default
        .string({ error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
        message: 'Only valid for Bangladesh. Format: +8801 or 01',
    })
        .optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.UserRole)).optional(),
    status: zod_1.default.enum(Object.values(user_interface_1.UserStatus)).optional(),
    isVerified: zod_1.default
        .boolean({
        error: 'isVerified must be true or false',
    })
        .optional(),
});
