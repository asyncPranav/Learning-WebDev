// You can also define schema in index.js but we are doing here in saparate file
// Better readability - we will later see MVC - (model, view, controller) pattern

const mongoose = require("mongoose");

// Define scheme
const contactSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

// Mongoose model
const contacts = mongoose.model("Contacts", contactSchema);

module.exports = contacts;
