"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, 'name is required'),
    description: zod_1.default.string().min(10, 'description is required'),
    liveLink: zod_1.default.string('liveLink must be a valid URL'),
    repoLink: zod_1.default.string('repoLink must be a valid URL'),
    techStack: zod_1.default
        .array(zod_1.default.string())
        .min(1, 'techStack must have at least one technology'),
    image: zod_1.default.string('image must be a valid URL').optional(),
});
