import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

const getAllContacts = async (req, res) => {
  try {
    // const contacts = await Contact.find();

    const { page = 1, limit = 3 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Contact.paginate({}, options);
    // res.json(result);
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", { message: "Failed to fetch contacts" });
  }
};

const getContactById = async (req, res) => {
  try {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!paramId) {
      return res.status(400).render("404", { message: "Invalid ID" });
    }

    const contact = await Contact.findById(paramId);

    if (!contact) {
      return res.status(404).render("404", { message: "Contact not found" });
    }
    res.render("show-contact", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", { message: "Server Error" });
  }
};

const addContactPage = (req, res) => {
  res.render("add-contact");
};

const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("add-contact", {
      message: "Something went wrong while adding contact",
    });
  }
};

const updateContactPage = async (req, res) => {
  try {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!paramId) {
      return res.status(400).render("404", {
        message: "Invalid ID",
      });
    }

    const contact = await Contact.findById(paramId);

    if (!contact) {
      return res.status(404).render("404", {
        message: "Contact not found",
      });
    }

    res.render("update-contact", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      message: "Server error while loading update page",
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!paramId) {
      return res.status(400).render("404", {
        message: "Invalid ID",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(paramId, req.body);

    if (!updatedContact) {
      return res.status(404).render("404", {
        message: "Contact not found",
      });
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      message: "Server error while updating contact",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!paramId) {
      return res.status(400).render("404", {
        message: "Invalid ID",
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(paramId);

    if (!deletedContact) {
      return res.status(404).render("404", {
        message: "Contact not found",
      });
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      message: "Server error while deleting contact",
    });
  }
};

export {
  getAllContacts,
  getContactById,
  addContactPage,
  addContact,
  updateContactPage,
  updateContact,
  deleteContact,
};
