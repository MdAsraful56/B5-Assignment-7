import express from 'express';
import { ContactController } from './contact.controller';

const route = express.Router();

route.post('/create', ContactController.CreateContactPost);
route.get('/all', ContactController.GetAllContacts);
route.delete('/delete/:id', ContactController.DeleteContact);

export const contactRoute = route;
