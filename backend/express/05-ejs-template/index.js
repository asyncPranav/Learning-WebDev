// commonjs import
// const express = require('express');

// ejs import
import express from "express";
const app = express();
const PORT = 3000;










/*
=================================================
Express.js app.set("view engine") and app.set("views") – Beginner Notes
=================================================

Statements:
app.set("view engine", "ejs");
app.set("views", "./my-templates");

-------------------------------------------------
1. app.set("view engine", "ejs")

Purpose:
- Sets EJS as the template/view engine for Express
- Allows rendering dynamic HTML using res.render()
- Express automatically uses EJS to generate HTML

How it works:
res.render("home")

Express looks for:
views/home.ejs (default folder)

-------------------------------------------------
Important Notes:
- You do NOT write ".ejs" in res.render()
- Express automatically adds extension
- Must install EJS before using

Install:
npm install ejs

-------------------------------------------------
2. app.set("views", "./my-templates")

Purpose:
- Changes default "views" folder location
- Tells Express where to find template files
- Default folder is: views/
- Now folder becomes: my-templates/

-------------------------------------------------
Default behavior (without this):

project/
 ├── app.js
 └── views/
      └── home.ejs

-------------------------------------------------
After using app.set("views", "./my-templates"):

project/
 ├── app.js
 └── my-templates/
      └── home.ejs

-------------------------------------------------
Example:

res.render("home")

Express will load:
my-templates/home.ejs

-------------------------------------------------
Important Notes:

- "views" setting only changes folder location
- "view engine" decides template type (ejs, pug, etc.)
- Both usually used together
- Path can be absolute or relative

-------------------------------------------------
Best Practice:

const path = require("path");

app.set("views", path.join(__dirname, "my-templates"));

Why better:
- Cross-platform safe
- Avoids relative path issues

-------------------------------------------------
Difference:

view engine
→ decides template type (ejs)

views
→ decides template folder location

-------------------------------------------------
Quick Notes:
- app.set("view engine", "ejs") → enable EJS
- app.set("views", folder) → change template folder
- Default folder = "views"
- res.render() uses these settings
*/
app.set("view engine", "ejs");
// app.set("views", "./my-templates"); // this is middleware that tells express to look for ejs templates in the "my-templates" folder









app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});












/*
=================================================
Express.js res.render() with Data – Beginner Notes
=================================================

Route:
app.get('/about', (req, res) => {
  let users = ["pranav", "ayush", "vageesh", "pawan"];

  let students = [
    {name: "pranav chandel", age: 20, city: "dehradun"},
    {name: "ayush singh", age: 21, city: "mumbai"},
    {name: "vageesh chauhan", age: 22, city: "delhi"},
    {name: "pawan yadav", age: 23, city: "bangalore"}
  ];

  res.render('about', {
    title: "About page",
    message: "Welcome to the EJS !",
    users: users,
    students: students
  });
});

-------------------------------------------------
Purpose:
res.render() is used to render an EJS template and
pass dynamic data from server to the view.

- Converts EJS → HTML
- Sends HTML to browser
- Allows dynamic content rendering

-------------------------------------------------
Syntax:
res.render(view, dataObject)

Parameters:

1. view (required)
   - Name of template file
   - Do NOT include extension
   - Express automatically adds .ejs
   - Example: "about" → about.ejs

2. dataObject (optional)
   - Object containing data to pass to template
   - Keys become variables in EJS
   - Must be JavaScript object

-------------------------------------------------
Data Passed to EJS:

{
  title: "About page",
  message: "Welcome to the EJS !",
  users: ["pranav", "ayush", "vageesh", "pawan"],
  students: [ {name, age, city}, ... ]
}

These become variables inside about.ejs:

title
message
users
students

-------------------------------------------------
EJS Usage Example:

<h1><%= title %></h1>
<p><%= message %></p>

<ul>
  <% users.forEach(user => { %>
    <li><%= user %></li>
  <% }) %>
</ul>

-------------------------------------------------
Accessing Objects in EJS:

<% students.forEach(student => { %>
  <p>
    <%= student.name %> -
    <%= student.age %> -
    <%= student.city %>
  </p>
<% }) %>

-------------------------------------------------
Flow:

Client requests:
GET /about

Server:
- Creates users array
- Creates students array
- Calls res.render()

Express:
- Loads about.ejs
- Injects data
- Converts to HTML
- Sends to browser

-------------------------------------------------
Important Notes:

- res.render automatically sends response
- No need to use res.send()
- Data passed must be object
- You can pass arrays, objects, strings, numbers
- EJS variables accessed using <%= %>

-------------------------------------------------
Quick Notes:
- res.render(view, data)
- view = template file name
- data = object passed to template
- Keys become variables in EJS
- Used for dynamic HTML rendering


Shorthand (ES6)

users: users
students: students

can be written as:

users,
students

-------------------------------------------------
*/
app.get("/about", (req, res) => {
  let users = ["pranav", "ayush", "vageesh", "pawan"];
  let students = [
    { name: "pranav chandel", age: 20, city: "dehradun" },
    { name: "ayush singh", age: 21, city: "mumbai" },
    { name: "vageesh chauhan", age: 22, city: "delhi" },
    { name: "pawan yadav", age: 23, city: "bangalore" },
  ];
  res.render("about", {
    title: "About page",
    message: "Welcome to the EJS !",
    users: users,
    students: students,
  });
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
