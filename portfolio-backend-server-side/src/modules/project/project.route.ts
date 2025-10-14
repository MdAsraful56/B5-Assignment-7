import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProjectController } from './project.controller';
import { createProjectSchema } from './project.validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(createProjectSchema),
    ProjectController.CreateProject
);
router.get('/all', ProjectController.GetAllProjects);
router.get('/:id', ProjectController.GetProjectById);
router.patch('/update/:id', ProjectController.UpdateProject);
router.delete('/delete/:id', ProjectController.DeleteProject);

export const projectRouter = router;
