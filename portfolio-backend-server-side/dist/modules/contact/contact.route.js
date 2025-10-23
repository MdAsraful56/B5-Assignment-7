"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoute = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const route = express_1.default.Router();
route.post('/create', contact_controller_1.ContactController.CreateContactPost);
route.get('/all', contact_controller_1.ContactController.GetAllContacts);
route.delete('/delete/:id', contact_controller_1.ContactController.DeleteContact);
exports.contactRoute = route;
