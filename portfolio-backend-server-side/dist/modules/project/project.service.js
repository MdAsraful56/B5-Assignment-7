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
exports.ProjectService = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../error/AppError"));
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload) {
        throw new AppError_1.default(400, 'Payload is required to create a project.');
    }
    const createProject = yield db_1.prisma.project.create({
        data: Object.assign({}, payload),
    });
    return createProject;
});
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield db_1.prisma.project.findMany();
    return projects;
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.prisma.project.findUnique({
        where: { id },
    });
    if (!project) {
        throw new AppError_1.default(404, 'Project not found.');
    }
    return project;
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProject = yield db_1.prisma.project.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    if (!updatedProject) {
        throw new AppError_1.default(404, 'Project not found.');
    }
    return updatedProject;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProject = yield db_1.prisma.project.delete({
        where: { id },
    });
    if (!deletedProject) {
        throw new AppError_1.default(404, 'Project not found.');
    }
    return deletedProject;
});
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
