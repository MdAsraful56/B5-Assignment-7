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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("./contact.service");
const CreateContactPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const contact = yield contact_service_1.ContactService.createContactPost(payload);
        res.status(201).json(contact);
    }
    catch (error) {
        next(error);
    }
});
const GetAllContacts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contact_service_1.ContactService.getAllContacts();
        res.status(200).json(contacts);
    }
    catch (error) {
        next(error);
    }
});
const DeleteContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield contact_service_1.ContactService.deleteContact(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.ContactController = {
    CreateContactPost,
    GetAllContacts,
    DeleteContact,
};
