import z from 'zod';
import { UserRole, UserStatus } from './user.interface';

export const createUserZodSchema = z.object({
    name: z
        .string()
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" }),
    email: z
        .string({ message: 'Email must be string.' })
        .email({ message: 'Invalid email adderss formet.' })
        .min(5, { message: 'at laest 5 characters long' })
        .max(100, { message: "It's too long" }),
    role: z.enum(Object.values(UserRole) as [string]).optional(),
    password: z
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
    phone: z
        .string({ error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
            message: 'Only valid for Bangladesh. Format: +8801 or 01',
        })
        .optional(),
});

export const updateUserZodSchema = z.object({
    name: z
        .string({ error: 'Name must be string.' })
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" })
        .optional(),
    password: z
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
    phone: z
        .string({ error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
            message: 'Only valid for Bangladesh. Format: +8801 or 01',
        })
        .optional(),
    role: z.enum(Object.values(UserRole) as [string]).optional(),
    status: z.enum(Object.values(UserStatus) as [string]).optional(),
    isVerified: z
        .boolean({
            error: 'isVerified must be true or false',
        })
        .optional(),
});
