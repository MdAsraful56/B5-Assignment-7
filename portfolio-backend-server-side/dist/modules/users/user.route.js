"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserController.CreateUser);
router.get('/all', (0, checkAuth_1.checkAuth)('ADMIN'), user_controller_1.UserController.GetAllUsers);
router.get('/:id', user_controller_1.UserController.GetSingleUser);
router.patch('/update/:id', (0, validateRequest_1.validateRequest)(user_validation_1.updateUserZodSchema), user_controller_1.UserController.UpdateUser);
router.delete('/delete/:id', user_controller_1.UserController.DeleteUser);
exports.userRouter = router;
