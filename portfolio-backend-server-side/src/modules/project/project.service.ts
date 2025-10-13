import { Prisma, Project } from '@prisma/client';
import { prisma } from '../../config/db';

const createProject = async (
    payload: Prisma.ProjectCreateInput
): Promise<Project> => {
    const createProject = await prisma.project.create({
        data: { ...payload },
    });
    return createProject;
};

const getAllProjects = async (): Promise<Project[]> => {
    const projects = await prisma.project.findMany();
    return projects;
};

const getProjectById = async (id: number): Promise<Project | null> => {
    const project = await prisma.project.findUnique({
        where: { id },
    });
    return project;
};

const updateProject = async (
    id: number,
    payload: Prisma.ProjectUpdateInput
): Promise<Project | null> => {
    const updatedProject = await prisma.project.update({
        where: { id },
        data: { ...payload },
    });
    return updatedProject;
};

const deleteProject = async (id: number): Promise<Project | null> => {
    const deletedProject = await prisma.project.delete({
        where: { id },
    });
    return deletedProject;
};

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
