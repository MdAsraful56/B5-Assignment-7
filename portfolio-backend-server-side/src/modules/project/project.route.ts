import express from 'express';
import { ProjectController } from './project.controller';

const router = express.Router();

router.post('/create', ProjectController.CreateProject);
router.get('/all', ProjectController.GetAllProjects);
router.get('/:id', ProjectController.GetProjectById);
router.patch('/update/:id', ProjectController.UpdateProject);
router.delete('/delete/:id', ProjectController.DeleteProject);

export const projectRouter = router;
