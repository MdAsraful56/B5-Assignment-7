import z from 'zod';

export const userLoginZodSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .regex(
            /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/,
            'Password must be at least 8 characters and mixed with at least one uppercase, lowercase and special character.'
        ),
});
