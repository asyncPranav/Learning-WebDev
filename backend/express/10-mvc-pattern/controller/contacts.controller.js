import Contact from "../models/contacts.models.js";

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.render("home", { contacts: contacts });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("show-contact", { contact: contact });
}

const addContactPage = async (req, res) => {  
  res.render("add-contact");
}

const addContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect("/");
}

const updateContactPage = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update-contact", { contact: contact });
}

const updateContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
}

const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
}

export { getAllContacts, getContactById, addContactPage, addContact, updateContactPage, updateContact, deleteContact };