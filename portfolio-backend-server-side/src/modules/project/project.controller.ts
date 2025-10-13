import { Request, Response } from 'express';
import { ProjectService } from './project.service';

const CreateProject = async (req: Request, res: Response) => {
    try {
        const project = await ProjectService.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json(error);
    }
};

const GetAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
};

const GetProjectById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const project = await ProjectService.getProjectById(id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const UpdateProject = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedProject = await ProjectService.updateProject(id, req.body);
        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const DeleteProject = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deletedProject = await ProjectService.deleteProject(id);
        if (deletedProject) {
            res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const ProjectController = {
    CreateProject,
    GetAllProjects,
    GetProjectById,
    UpdateProject,
    DeleteProject,
};
