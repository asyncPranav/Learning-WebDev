# Beginner Notes: Express + EJS Template Partials

This note is written for a complete beginner. It explains how this folder works from request to response, with special focus on:

1. how Express renders EJS pages
2. how partials are included
3. how the form sends data
4. how the server handles /submit and sends data back to EJS

---

## 1) What this folder is teaching

This project teaches server-side rendering.

Server-side rendering means:

1. Browser requests a URL
2. Express runs JavaScript on the server
3. Express asks EJS to generate HTML
4. Server sends ready-made HTML to browser

So in this project, HTML is not built by browser JavaScript. It is built on the server using EJS templates.

---

## 2) Simple map of this folder

```txt
07-ejs-template-partials/
  index.js                 -> Express server + routes
  views/
    header.ejs             -> reusable top layout
    footer.ejs             -> reusable bottom layout
    home.ejs               -> form page + message block
    aboutus.ejs            -> about page content
  public/
    style.css              -> custom CSS
    img.png                -> image used in about page
```

Think of it like this:

1. index.js decides what page to show
2. views contain page templates
3. public contains static files that browser can fetch directly

---

## 3) Core Express setup (and why each line matters)

In index.js:

```js
app.set('view engine', 'ejs');
```

Meaning:

1. res.render('home') will look for views/home.ejs
2. you do not need to write the .ejs extension every time

```js
app.use(express.urlencoded({ extended: false }));
```

Meaning:

1. when form sends data using method POST, Express can read it
2. form fields become available in req.body
3. without this line, req.body.myname would be undefined

```js
app.use(express.static('public'));
```

Meaning:

1. files in public become public URLs
2. style.css can be loaded by href="/style.css" or href="style.css"
3. img.png can be loaded by src="/img.png"

---

## 4) How Express and EJS work together

The key API is:

```js
res.render(viewName, dataObject)
```

What happens internally:

1. Express finds the view file inside views
2. Express passes dataObject values to EJS
3. EJS executes template code and creates final HTML string
4. Express sends that HTML to browser

Example from this project:

```js
res.render('home', { title: 'Home Page', message: '' });
```

Inside home.ejs and included partials, title and message are available as normal variables.

---

## 5) Route-by-route explanation

### GET /

```js
res.send('Welcome to the EJS Template Partials Example!');
```

This route returns plain text, not EJS template.

### GET /home

```js
res.render('home', { title: 'Home Page', message: '' });
```

This opens the home page.

Important points:

1. message is empty on first load
2. because message is empty, conditional alert block does not show
3. title is used in header.ejs for browser tab title

### POST /submit

```js
const { myname } = req.body;
const message = `Hello ${myname}! You have submitted your form.`;

res.render('home', {
  title: 'Home Page',
  message
});
```

This is the most important route in this folder.

It does not redirect. It directly renders home.ejs again, but now with a real message.

### GET /about

```js
res.render('aboutus', { title: 'About Us' });
```

Renders aboutus.ejs with shared header/footer partials.

---

## 6) Deep form flow: /home -> /submit -> home again

In home.ejs, the form is:

```html
<form action="/submit" method="POST">
  <input name="myname" />
</form>
```

Exact flow:

1. User opens /home
2. Browser receives HTML form from server
3. User types a value in input field with name=myname
4. User clicks submit
5. Browser sends POST request to /submit
6. Request body contains myname=value
7. Express urlencoded middleware parses body
8. Route handler reads req.body.myname
9. Route builds message string
10. Route renders home.ejs again with new message
11. EJS condition passes, alert appears

This is a classic server-rendered form cycle.

---

## 7) Understanding EJS tags used in this folder

### 1. Script tag (logic only)

```ejs
<% if (message) { %>
  ...
<% } %>
```

Runs JavaScript logic. Does not print content directly.

### 2. Escaped output

```ejs
<%= message %>
```

Prints value into HTML safely.

Why safe: special HTML characters are escaped, reducing XSS risk.

### 3. Unescaped output (used for includes)

```ejs
<%- include('header') %>
```

Prints raw HTML output of another template.

Used correctly here for partials like header/footer.

---

## 8) How partials are used in this project

home.ejs:

```ejs
<%- include('header') %>
...home content...
<%- include('footer') %>
```

aboutus.ejs:

```ejs
<%- include('header', { title: 'About Us' }) %>
...about content...
<%- include('footer') %>
```

What this gives you:

1. no repetition of HTML head, bootstrap link, common wrapper
2. footer and scripts are in one place
3. easier maintenance

If header changes, all pages using header automatically update.

---

## 9) What each EJS file is doing

### header.ejs

Responsibilities:

1. starts HTML document
2. sets dynamic title
3. loads Bootstrap CSS
4. loads external style.css
5. starts body and container
6. shows a common top banner

Title line:

```ejs
<title><%= title || 'My Express App' %></title>
```

If title is not passed, fallback is My Express App.

### footer.ejs

Responsibilities:

1. shows common footer section
2. prints current year using JavaScript Date
3. loads Bootstrap JS bundle
4. closes document tags

### home.ejs

Responsibilities:

1. includes header/footer
2. provides form with input name myname
3. conditionally shows message alert when message exists

### aboutus.ejs

Responsibilities:

1. includes header/footer
2. shows about content card
3. loads static image using src="img.png"

Because static middleware is configured, image is served from public folder.

---

## 10) Request lifecycle in beginner language

Think of Express as waiter, EJS as cook, browser as customer.

1. Customer asks: give me /home
2. Waiter (Express) goes to cook (EJS) with ingredients (title, message)
3. Cook makes complete dish (HTML)
4. Waiter serves dish to customer (browser)

For submit:

1. Customer sends form data
2. Waiter reads data (req.body)
3. Waiter prepares a message
4. Waiter asks cook to make home page again with this message
5. Customer now sees result message

---

## 11) Important beginner concepts hidden in this small project

1. GET and POST are different
GET asks for page; POST sends data to server

2. Input name controls req.body key
input name=myname means server reads req.body.myname

3. res.render sends HTML, not JSON
This is template rendering flow, not API flow

4. Partial include is server-side include
Browser never sees EJS syntax; browser receives final HTML

5. Same template can render different outputs
home.ejs first without message, then with message after submit

---

## 12) Common beginner mistakes and how this project avoids them

1. Mistake: forgetting urlencoded middleware
Result: req.body is empty

2. Mistake: input name and req.body key mismatch
Result: undefined value

3. Mistake: not passing required render variables
Result: title/message missing in template

4. Mistake: putting CSS/image outside static folder
Result: 404 for assets

5. Mistake: duplicating header/footer in every file
Result: hard maintenance

---

## 13) Why /submit re-renders home instead of redirecting

Current behavior:

1. POST /submit handles form
2. directly calls res.render('home', ...)

This is okay for learning and simple examples.

In larger apps, many developers use redirect after POST (PRG pattern), but your current approach is perfectly valid for understanding EJS rendering basics.

---

## 14) Visual flow chart

```text
GET /home
  -> Express route
  -> res.render('home', { title, message: '' })
  -> home includes header + footer
  -> HTML response

POST /submit (myname)
  -> Express route
  -> req.body.myname
  -> create message
  -> res.render('home', { title, message })
  -> message block visible
```

---

## 15) Practice tasks for better understanding

1. Show submitted name in input value after submit
Hint: pass myname to render and set value in input

2. Add an age field and print both name and age in message

3. Add a new contact page using same header/footer partials

4. Move top banner into a separate partial and include it in both pages

5. Add a condition: if name is blank, show error alert instead of success message

---

## 16) Final beginner summary

This folder demonstrates the full basic cycle of Express + EJS:

1. route receives request
2. route passes data into res.render
3. EJS combines partials + page content + dynamic values
4. browser receives final HTML
5. form submission sends data to server and server re-renders with updated values

If you fully understand this folder, you already understand the foundation of server-side rendered Node.js apps.
