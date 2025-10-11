import { Contact, Prisma } from '@prisma/client';
import { prisma } from '../../config/db';

const createContactPost = async (
    payload: Prisma.ContactCreateInput
): Promise<Contact> => {
    console.log(payload, 'payload from service');
    const contact = await prisma.contact.create({
        data: payload,
    });
    console.log(contact, 'contact from service');
    return contact;
};

const getAllContacts = async (): Promise<Contact[]> => {
    const contacts = await prisma.contact.findMany();
    return contacts;
};

export const ContactService = {
    createContactPost,
    getAllContacts,
};
