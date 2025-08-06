import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}! `,
    data: contact,
  });
};

export const createConatactController = async (req, res) => {
  const body = await req.body;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    maessage: 'Succesfully created contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await updateContact(contactId, body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched contact with id ${contactId}!`,
    data: result.contact,
  });
};
