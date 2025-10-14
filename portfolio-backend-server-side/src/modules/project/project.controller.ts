import { Request, Response } from 'express';
import catchAsync from '../../utilis/catchAsync';
import { sendResponse } from '../../utilis/sendResponse';
import { ProjectService } from './project.service';

const CreateProject = catchAsync(async (req: Request, res: Response) => {
    try {
        const project = await ProjectService.createProject(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Project created successfully',
            data: project,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const GetAllProjects = catchAsync(async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getAllProjects();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Projects retrieved successfully',
            data: projects,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const GetProjectById = catchAsync(async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const project = await ProjectService.getProjectById(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Project retrieved successfully',
            data: project,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const UpdateProject = catchAsync(async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedProject = await ProjectService.updateProject(id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Project updated successfully',
            data: updatedProject,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

const DeleteProject = catchAsync(async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deletedProject = await ProjectService.deleteProject(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Project deleted successfully',
            data: deletedProject,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            data: null,
        });
    }
});

export const ProjectController = {
    CreateProject,
    GetAllProjects,
    GetProjectById,
    UpdateProject,
    DeleteProject,
};
