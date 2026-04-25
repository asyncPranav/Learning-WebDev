const express = require("express");
const app = express();


/*
=================================================
Express.js view engine + express.urlencoded() – Beginner Notes
=================================================

Statements:
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

-------------------------------------------------
Purpose:

1. app.set("view engine", "ejs")
- Sets EJS as template engine
- Enables res.render() to render EJS files
- Converts EJS → HTML

2. express.urlencoded()
- Middleware to read form data
- Parses application/x-www-form-urlencoded
- Stores data inside req.body

Used for:
HTML form POST requests

-------------------------------------------------
Syntax:

app.set("view engine", "ejs")

app.use(express.urlencoded(options))

-------------------------------------------------
Parameters:

express.urlencoded({ extended: false })

extended:
- true  → supports nested objects (qs library)
- false → supports simple key-value pairs

Recommended for beginners:
extended: false

-------------------------------------------------
Example HTML Form:

<form method="POST" action="/submit">
  <input type="text" name="username">
  <input type="text" name="age">
  <button>Submit</button>
</form>

-------------------------------------------------
Example Route:

app.post("/submit", (req, res) => {
  console.log(req.body);
});

Form Data Sent:

username=pranav
age=20

-------------------------------------------------
req.body Output:

{
  username: "pranav",
  age: "20"
}

-------------------------------------------------
Flow:

Client:
Submit form

Browser sends:
POST /submit
Content-Type: application/x-www-form-urlencoded

Express:
express.urlencoded() parses body

Server:
Data stored in req.body

Route:
Access using req.body.username

-------------------------------------------------
Important Notes:

- Must place before routes
- Works only for form data
- Only parses POST/PUT/PATCH body
- Required to read req.body
- Without this → req.body undefined

Correct Order:

app.use(express.urlencoded({ extended: false }));

app.post(...)
app.post(...)

-------------------------------------------------
Quick Notes:

app.set("view engine","ejs")
→ enable EJS templates

express.urlencoded()
→ read form data

req.body
→ access form values

extended: false
→ simple form parsing

=================================================
*/
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});



/*
=================================================
Express.js GET Route Rendering Form (res.render) – Beginner Notes
=================================================

Route:
app.get("/form", (req, res) => {
  res.render("form", { message: null });
});

-------------------------------------------------
Purpose:
This route renders a form page using EJS.

- Handles GET request to /form
- Loads form.ejs template
- Sends initial data to template
- message is set to null initially

Used for:
Displaying form before submission

-------------------------------------------------
Syntax:
app.get(path, callback)

res.render(view, dataObject)

-------------------------------------------------
Parameters:

1. path
   - URL route
   - Example: "/form"
   - Triggered when user visits /form

2. callback
   - Function(req, res)
   - Handles incoming request

3. view (res.render)
   - Template name
   - "form" → form.ejs

4. dataObject
   - Data passed to template
   - message variable available in EJS

-------------------------------------------------
Data Passed to EJS:

{
  message: null
}

Inside form.ejs:

message

-------------------------------------------------
EJS Example (form.ejs):

<h1>Contact Form</h1>

<% if(message){ %>
  <p><%= message %></p>
<% } %>

<form method="POST" action="/submit">
  <input type="text" name="name">
  <button>Submit</button>
</form>

-------------------------------------------------
Flow:

Client requests:
GET /form

Server:
Route /form triggered

Express:
Loads form.ejs

Data injected:
message = null

EJS:
Condition false (no message shown)

Browser:
Form page displayed

-------------------------------------------------
Important Notes:

- GET route used to display form
- message null → nothing shown initially
- Data passed to template
- res.render sends HTML response
- Template must exist (form.ejs)

-------------------------------------------------
Quick Notes:

app.get("/form")
→ open form page

res.render("form")
→ render form.ejs

{ message: null }
→ initial empty message

Used for:
initial form load

=================================================
*/
app.get("/form", (req, res) => {
  res.render("form", { message: null });
});










/*
=================================================
Express.js Form Handling with POST + EJS – Beginner Notes
=================================================

Route:
app.post("/submit", (req, res) => {
  ...
});

-------------------------------------------------
Purpose:
This route handles form submission from the client.

- Receives form data using POST method
- Reads data using req.body
- Processes data in server
- Sends response using res.send() or res.render()

Used for:
Form handling + showing success message

-------------------------------------------------
Syntax:
app.post(path, callback)

res.render(view, dataObject)

-------------------------------------------------
Parameters:

1. path
   - URL route for POST request
   - Example: "/submit"

2. callback
   - Function(req, res)
   - Handles form submission

3. req.body
   - Contains form data (requires express.urlencoded middleware)
   - Example: { myname: "pranav" }

4. view
   - Template file name
   - "form" → form.ejs

5. dataObject
   - Data passed to EJS template
   - message variable available in EJS

-------------------------------------------------
Pre-requirements:
You MUST have these middlewares before this route:

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Without them:
req.body will be undefined

-------------------------------------------------
Example Code Flow:

const name = req.body.myname;

Explanation:
- "myname" comes from HTML form input name attribute
- req.body contains submitted form data
- Express parses it using middleware

-------------------------------------------------
Example Form Input (HTML/EJS):

<input name="myname">

Submitted data becomes:

{
  myname: "Pranav"
}

-------------------------------------------------
Message Creation:

const message = `Hello ${name} ! You have submitted your form.`;

Explanation:
- Template literal used
- Dynamic message created using user input

-------------------------------------------------
Response Options:

Option 1 (Simple text response):
res.send(message);

- Sends plain text to browser
- No template used

-------------------------------------------------
Option 2 (EJS rendering - used in your code):

res.render("form", { message: message });

Explanation:
- Loads form.ejs template
- Passes message variable to EJS
- Displays dynamic content on page

-------------------------------------------------
Flow of Request:

1. User submits form
2. POST /submit is triggered
3. req.body reads form data
4. Server processes name
5. Message is created
6. EJS page is rendered with message
7. Browser shows response

-------------------------------------------------
Example Output:

If user enters:
myname = Pranav

Output:
Hello Pranav ! You have submitted your form.

-------------------------------------------------
Important Notes:

- Input name attribute MUST match req.body key
- POST method is required for form submission
- express.urlencoded() is required for form data
- res.render() is used for dynamic HTML response
- res.send() is used for simple response

-------------------------------------------------
Difference:

res.send()
→ Sends plain text or JSON

res.render()
→ Sends HTML page using template engine (EJS)

-------------------------------------------------
Quick Notes:
- req.body.myname → form input value
- POST route → handles form submission
- express.urlencoded() → required for forms
- res.render() → sends dynamic HTML page
=================================================
*/
app.post("/submit", (req, res) => {
  // console.log(req.body);

  const name = req.body.myname;
  const message = `Hello ${name} ! You have submitted your form.`;
  // res.send(message);

  res.render("form", { message: message });
});











/*
=================================================
Express.js Form Handling (Destructuring + Validation) – Beginner Notes
=================================================

Code : 
app.post("/submit", (req, res) => {
  const { myname } = req.body;

  const message = myname
    ? `Hello ${myname}! You have submitted your form.`
    : "Please enter your name.";

  res.render("form", { message });
});


-------------------------------------------------
Route:
app.post("/submit", (req, res) => {
  const { myname } = req.body;

  const message = myname
    ? `Hello ${myname}! You have submitted your form.`
    : "Please enter your name.";

  res.render("form", { message });
});

-------------------------------------------------
Purpose:
This route handles form submission using:
- Object destructuring
- Basic validation
- EJS rendering
- Clean and modern JavaScript style

It improves:
- Code readability
- Input safety
- Dynamic response handling

-------------------------------------------------
Prerequisites (IMPORTANT):

You must include middleware before routes:

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Without this:
- req.body will be undefined
- form data will NOT work

-------------------------------------------------
Syntax:
app.post(path, callback)

res.render(view, dataObject)

-------------------------------------------------
Parameters:

1. path
   - "/submit"
   - POST route for form submission

2. callback (req, res)
   - Handles request and response

3. req.body
   - Contains form data sent from client
   - Example: { myname: "Pranav" }

4. { myname }
   - Object destructuring
   - Extracts myname directly from req.body

5. message
   - Dynamic output message passed to EJS

-------------------------------------------------
1. Object Destructuring:

const { myname } = req.body;

Explanation:
- Extracts property directly from object
- Short form of:
  const myname = req.body.myname;

Benefit:
- Cleaner code
- Easier to read
- Modern JavaScript practice

-------------------------------------------------
2. Form Data Flow:

HTML Input:
<input name="myname">

After submission:

{
  myname: "Pranav"
}

-------------------------------------------------
3. Validation Logic:

const message = myname
  ? `Hello ${myname}! You have submitted your form.`
  : "Please enter your name.";

Explanation:
- If myname exists → success message
- If empty/undefined → error message
- Uses ternary operator (condition ? true : false)

-------------------------------------------------
4. Response Rendering:

res.render("form", { message });

Explanation:
- Loads form.ejs template
- Passes message variable
- Displays dynamic output in UI

-------------------------------------------------
DATA PASSED TO EJS:

Case 1:
{
  message: "Hello Pranav! You have submitted your form."
}

Case 2:
{
  message: "Please enter your name."
}

-------------------------------------------------
FLOW:

1. User submits form
2. POST /submit triggered
3. express.urlencoded() parses data
4. req.body contains form data
5. myname extracted using destructuring
6. Validation check runs
7. message is created
8. res.render() reloads form.ejs
9. Browser displays result

-------------------------------------------------
IMPORTANT NOTES:

- express.urlencoded() is REQUIRED
- Input "name" must match req.body key
- Without middleware → req.body is undefined
- Same page is re-rendered after submit
- Always validate user input

-------------------------------------------------
HTML EXAMPLE:

<input type="text" name="myname">

Must match:
req.body.myname

-------------------------------------------------
DIFFERENCE:

Normal way:
const myname = req.body.myname;

Destructuring way:
const { myname } = req.body;

-------------------------------------------------
QUICK NOTES:

- req.body → form data
- { myname } → destructuring
- ternary operator → condition check
- res.render() → send dynamic HTML
- validation → prevents empty input
- used in real-world forms

=================================================
*/


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
