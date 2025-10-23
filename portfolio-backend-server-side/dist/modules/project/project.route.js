"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.validateRequest)(project_validation_1.createProjectSchema), project_controller_1.ProjectController.CreateProject);
router.get('/all', project_controller_1.ProjectController.GetAllProjects);
router.get('/:id', project_controller_1.ProjectController.GetProjectById);
router.patch('/update/:id', project_controller_1.ProjectController.UpdateProject);
router.delete('/delete/:id', project_controller_1.ProjectController.DeleteProject);
exports.projectRouter = router;
