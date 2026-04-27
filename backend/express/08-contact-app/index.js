const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/contacts.models");

const app = express();
const PORT = 3000;

/*
=================================================
MongoDB + Mongoose (CRUD Setup) – Beginner Notes
=================================================

This code shows how to connect Express project
with MongoDB using Mongoose and define a model
in a separate file (MVC-style structure).

-------------------------------------------------
1. IMPORT MONGOOSE

const mongoose = require("mongoose");

Purpose:
- Mongoose is an ODM (Object Data Modeling) library
- It connects Node.js with MongoDB
- It allows schema-based data structure

-------------------------------------------------
2. DATABASE CONNECTION

mongoose.connect("mongodb://localhost:27017/contacts-crud")
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));

Explanation:

- mongodb://localhost:27017 → local MongoDB server
- contacts-crud → database name

Flow:
✔ Try to connect to MongoDB
✔ If success → "Database connected"
✔ If error → show error in console

-------------------------------------------------
Important Notes:
- MongoDB runs on port 27017 by default
- Database is created automatically if not exists
- Connection is asynchronous (returns Promise)

-------------------------------------------------
3. WHY SEPARATE MODEL FILE?

const Contact = require("./models/contacts.models")

Why we do this:
✔ Better code organization
✔ Easier maintenance
✔ Follows MVC pattern (Model View Controller)
✔ Reusable models

-------------------------------------------------
MVC IDEA (IMPORTANT):
- Model → database structure (this file)
- View → frontend (EJS, HTML)
- Controller → logic (routes)

-------------------------------------------------
4. DEFINE SCHEMA

const contactSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email_name: String,
  phone_name: String,
  address: String
});

Explanation:

Schema = structure of database document

Each field defines:
- name of field
- type of data (String, Number, etc.)

-------------------------------------------------
Field Breakdown:

first_name → user's first name
last_name  → user's last name
email_name → email field
phone_name → phone number
address    → user address

-------------------------------------------------
Important Notes:
- Schema defines structure of MongoDB collection
- MongoDB stores data as JSON-like documents
- Mongoose enforces structure (unlike raw MongoDB)

-------------------------------------------------
5. CREATE MODEL

const contacts = mongoose.model("Contacts", contactSchema);

Explanation:

- "Contacts" → collection name in MongoDB
- contactSchema → structure rules

Important:
MongoDB will automatically create:
contacts collection

-------------------------------------------------
Naming Rule:
- Mongoose converts "Contacts" → "contacts" (plural + lowercase)

-------------------------------------------------
6. EXPORT MODEL

module.exports = contacts;

Purpose:
- Makes model usable in other files
- Allows CRUD operations from routes/controller

Example usage:
const Contact = require("./models/contacts.models")

-------------------------------------------------
REAL FLOW SUMMARY:

1. Mongoose connects to MongoDB
2. Schema defines structure
3. Model is created from schema
4. Model is exported
5. Controller uses model for CRUD

-------------------------------------------------
WHAT YOU BUILT HERE:

✔ MongoDB connection
✔ Schema definition
✔ Model creation
✔ MVC separation setup
✔ Ready for CRUD operations

-------------------------------------------------
NEXT STEP (VERY IMPORTANT):

Now you can do:

CREATE operations:
Contact.create()

READ operations:
Contact.find()

UPDATE operations:
Contact.findByIdAndUpdate()

DELETE operations:
Contact.findByIdAndDelete()

-------------------------------------------------
QUICK NOTES:
- mongoose.connect → connect DB
- Schema → structure of data
- Model → collection interface
- module.exports → share model
- MVC → best project structure

=================================================
*/

// Database connection
mongoose
  .connect("mongodb://localhost:27017/contacts-crud")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  const contacts = await Contact.find();
  // res.json(contact)
  res.render("home", { contacts: contacts });
});

app.get("/show-contact/:id", async (req, res) => {
  // mongodb-method
  // const contact = await Contact.findOne({ _id: req.params.id });
  // res.json(contact)

  // mongoose-method (easier)
  const contact = await Contact.findById(req.params.id);
  // res.json(contact)
  res.render("show-contact", { contact: contact });
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

app.post("/add-contact", async (req, res) => {
  // res.send(req.body)
  // mongodb-method
  /*   
  const contact = await Contact.insertOne({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  res.redirect("/"); 
  */

  // mongoose-method (easier)
  /*   
  const contact = await Contact.create(req.body)
  res.redirect("/")
 */

  // mongoose-method -> we can also remove variable contact since we are not reusing it
  await Contact.create(req.body);
  res.redirect("/");
});

app.get("/update-contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update-contact", { contact: contact });
});

app.post("/update-contact/:id", async (req, res) => {
  // res.send(req.body)

  // if form input field's names are same as key name in your db
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");

  // if form input field's names are is same as key name in your db - Destructure req.body
  /*   
  const { first_name, last_name, email, phone, address } = req.body;
  await Contact.findByIdAndUpdate(req.params.id, { first_name, last_name, email, phone, address } );
  res.redirect("/");
 */
});

app.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
