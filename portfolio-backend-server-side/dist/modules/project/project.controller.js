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
exports.ProjectController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const project_service_1 = require("./project.service");
const CreateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield project_service_1.ProjectService.createProject(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: 'Project created successfully',
            data: project,
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
const GetAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_service_1.ProjectService.getAllProjects();
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Projects retrieved successfully',
            data: projects,
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
const GetProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const project = yield project_service_1.ProjectService.getProjectById(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Project retrieved successfully',
            data: project,
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
const UpdateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updatedProject = yield project_service_1.ProjectService.updateProject(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Project updated successfully',
            data: updatedProject,
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
const DeleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedProject = yield project_service_1.ProjectService.deleteProject(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'Project deleted successfully',
            data: deletedProject,
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
exports.ProjectController = {
    CreateProject,
    GetAllProjects,
    GetProjectById,
    UpdateProject,
    DeleteProject,
};
