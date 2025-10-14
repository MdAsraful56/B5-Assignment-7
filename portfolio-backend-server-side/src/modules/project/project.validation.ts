import z from 'zod';

export const createProjectSchema = z.object({
    name: z.string().min(3, 'name is required'),
    description: z.string().min(10, 'description is required'),
    liveLink: z.string('liveLink must be a valid URL'),
    repoLink: z.string('repoLink must be a valid URL'),
    techStack: z
        .array(z.string())
        .min(1, 'techStack must have at least one technology'),
    image: z.string('image must be a valid URL').optional(),
});
