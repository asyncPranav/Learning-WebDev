import express from "express";
import { getAllContacts, getContactById, addContactPage, addContact, updateContactPage, updateContact, deleteContact } from "../controller/contacts.controller.js";

const router = express.Router();

// Routes
router.get("/", getAllContacts);

router.get("/show-contact/:id", getContactById);

router.get("/add-contact", addContactPage);

router.post("/add-contact", addContact);

router.get("/update-contact/:id", updateContactPage);

router.post("/update-contact/:id", updateContact);

router.get("/delete-contact/:id", deleteContact);

export default router;