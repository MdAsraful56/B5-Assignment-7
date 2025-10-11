import { NextFunction, Request, Response } from 'express';
import { ContactService } from './contact.service';

const CreateContactPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body;
        const contact = await ContactService.createContactPost(payload);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

const GetAllContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contacts = await ContactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const ContactController = {
    CreateContactPost,
    GetAllContacts,
};
