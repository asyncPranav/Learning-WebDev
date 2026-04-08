const express = require("express");
const app = express();
const PORT = 3000;

// Basic routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/users", (req, res) => {
  res.send("Users page");
});










/*
  Express.js res.send() Example – Sending JSON and Arrays

  Key Concepts for Beginners:
  1. res.send() is used to send a response from the server to the client.
  2. You can send different types of data using res.send():
     - String → res.send("Hello")
     - Object → res.send({ name: "Pranav" })
     - Array  → res.send(["Mango", "Banana"])
     - HTML   → res.send("<h1>Hello</h1>")
  3. When you send an object or array, Express automatically converts it to JSON.
  4. JSON responses are commonly used in APIs.
  5. The browser will display JSON data when visiting the route.

  Example:
  - Visiting http://localhost:3000/send
    -> Returns ["Mango", "Banana", "Apple"]

  Notes:
  - Objects are useful for structured data (user info, product info, etc.)
  - Arrays are useful for lists (fruits, users, items, etc.)
  - res.send() automatically sets Content-Type to application/json for objects/arrays
*/

app.get("/send", (req, res) => {
  // sent object but it will be converted to json and sent to the client
  res.send({
    name: "asyncpranav",
    age: 25,
    city: "Bangalore",
  });

  // sent array but it will be converted to json and sent to the client
  res.send(["Mango", "Banana", "Apple"]);
});










/*
  Express.js res.json() – Sending JSON Responses

  Key Concepts for Beginners:
  1. res.json() is used to send JSON data from the server to the client.
  2. It automatically converts JavaScript objects or arrays into JSON format.
  3. It also sets the correct response header: Content-Type: application/json.
  4. res.json() is mainly used when building APIs.
  5. You can send:
     - Object → res.json({ name: "Pranav" })
     - Array  → res.json([{ id: 1 }, { id: 2 }])

  Difference between res.send() and res.json():
  - res.send() → can send string, HTML, object, array, etc.
  - res.json() → specifically used for JSON responses
  - Both convert object/array to JSON, but res.json() is more explicit and preferred for APIs

  Example:
  - http://localhost:3000/json1 → returns single JSON object
  - http://localhost:3000/json2 → returns JSON array
*/

app.get("/json1", (req, res) => {
  // sent object but it will be converted to json and sent to the client
  res.json({
    name: "pranav singh chandel",
    age: 25,
    city: "Bangalore",
  });
});

app.get("/json2", (req, res) => {
  const users = [
    { id: 1, name: "pranav" },
    { id: 2, name: "ayush" },
    { id: 3, name: "vageesh" },
  ];
  // sent array but it will be converted to json and sent to the client
  res.json(users);
});










/*
  Express.js res.jsonp() – Sending JSONP Responses

  Key Concepts for Beginners:
  1. res.jsonp() is similar to res.json() but adds **JSONP support**.
  2. JSONP (JSON with Padding) allows **cross-domain requests** in older browsers where CORS isn't available.
  3. When using res.jsonp(), Express automatically wraps the JSON object in a callback function if a query parameter `callback` is provided.
     - Example URL: /jsonp?callback=handleResponse
     - Response sent to the browser: typeof handleResponse === 'function' && handleResponse({"id":1,"name":"pranav"});
  4. If no `callback` query is provided, it behaves like res.json() and sends normal JSON.
  5. Use JSONP only if you need to support cross-domain requests in older browsers; otherwise, use CORS + res.json().
  
  Example Usage:
  - http://localhost:3000/jsonp
    → Response: {"id":1,"name":"pranav"}  (no callback, normal JSON)
  - http://localhost:3000/jsonp?callback=myFunction
    → Response: typeof handleResponse === 'function' && handleResponse({"id":1,"name":"pranav"});  (wrapped in callback function)
*/

app.get("/jsonp", (req, res) => {
  // sent array but it will be converted to json and sent to the client
  res.jsonp({ id: 1, name: "pranav" });
});










/*
  Express.js res.redirect() – Redirecting Requests with Relative Paths

  Key Concepts for Beginners:

  1. res.redirect() is used to send the client to another URL or route.
  
  2. Types of redirect targets:
     - Absolute URLs → Full URL including protocol and domain
       Example: "https://github.com/asyncpranav"

     - Internal routes / Absolute paths → Start with "/"
       Example: "/users", "/about"
       Redirects to a route relative to your site root

     - Relative paths → Relative to the current URL
       Example: ".." → moves one level up from current path
       Example: "../about" → moves one level up and then to "about"
       Example: "./contact" → stays in current level, adds "contact"

  3. How relative paths work:
     - Suppose current URL is: http://localhost:3000/blog/post1
       - ".." → http://localhost:3000/blog → moves up one level
       - "../about" → http://localhost:3000/about → moves up one level and adds "about"
       - "./contact" → http://localhost:3000/blog/contact → stays in current level, adds "contact"

  4. Optional HTTP status codes:
     - 301 → Permanent Redirect (search engines update URL)
     - 302 → Found / Temporary Redirect (default if not specified)
     - 303 → See Other (commonly used after POST requests)

  5. Key Notes:
     - Always decide whether the redirect should be temporary or permanent
     - Relative redirects are convenient for internal navigation without hardcoding full paths
     - Absolute paths (starting with "/") are preferred for clarity in internal site redirects
*/

app.get("/redirect1", (req, res) => {
  res.redirect("https://github.com/asyncpranav");
});

app.get("/redirect2", (req, res) => {
  res.redirect("/users");
});

app.get("/redirect3", (req, res) => {
  res.redirect(301, "https://github.com/asyncpranav");
});

app.get("/redirect4", (req, res) => {
  res.redirect(302, "https://github.com/asyncpranav");
});

app.get("/redirect5", (req, res) => {
  res.redirect(303, "https://github.com/asyncpranav");
});

app.get("/redirect6", (req, res) => {
  res.redirect("..");
});








/*
  Express.js View Engine Setup with EJS and res.render()

  Key Concepts for Beginners:

  1. app.set("view engine", "ejs")
     - This sets EJS as the template/view engine for Express.
     - Express will automatically look for .ejs files inside the "views" folder.
     - You don’t need to write the ".ejs" extension in res.render().

  2. What is a View Engine?
     - A view engine lets you generate dynamic HTML using templates.
     - Instead of sending static HTML, you can render pages with data.

  3. res.render("render1")
     - This tells Express to render the "render1.ejs" file.
     - Express looks inside: views/render1.ejs
     - Then converts it to HTML and sends it to the browser.

  4. Folder Structure (default):
     project/
       ├── views/
       │     └── render1.ejs
       └── app.js

  5. Example:
     - Visiting http://localhost:3000/render1
     - Express loads views/render1.ejs
     - Converts EJS → HTML
     - Sends HTML to the browser

  6. Important Notes:
     - "views" folder name is default (can be changed using app.set("views", path))
     - render1 must exist inside views folder
     - res.render() automatically sends the response (no need for res.send())
*/

app.set("view engine", "ejs");

app.get("/render", (req, res) => {
  res.render("render");
});







/*
  Express.js res.download() – Downloading Files

  Key Concepts for Beginners:

  1. res.download() is used to send a file to the client as a download.
     - Instead of opening in the browser, the file will be downloaded.
     - The browser shows a "Save file" dialog.

  2. Syntax:
     - res.download(filePath)
     - res.download(filePath, fileName)

  3. res.download("./files/sample.txt")
     - Sends the file located at ./files/sample.txt
     - The downloaded file keeps the original name: sample.txt

  4. res.download("./files/sample.txt", "document.txt")
     - Sends the same file
     - But the downloaded filename will be "document.txt"
     - This only changes the name for the user, not the actual file

  5. File path:
     - Path is relative to the project root
     - Make sure the file exists, otherwise Express will throw an error

  6. Example behavior:
     - Visiting /download1 → downloads sample.txt
     - Visiting /download2 → downloads document.txt

  7. Notes:
     - Useful for PDFs, images, text files, zip files, etc.
     - Browser will not display file, it forces download
     - You can dynamically generate filename for users
*/

app.get("/download1", (req, res) => {
  res.download("./files/sample.txt");
});

app.get("/download2", (req, res) => {
  res.download("./files/sample.txt", "document.txt");
});








/*
=================================================
Express.js res.sendFile() – Beginner Notes
=================================================

Syntax:
res.sendFile(path [, options] [, callback])

Parameters:
1. path (required)
   - Absolute path to file
   - OR relative path if "root" option is used

2. options (optional)
   - root   → base directory for relative paths
   - headers → set custom headers
   - maxAge → cache control
   - dotfiles → allow/deny hidden files

3. callback (optional)
   - function(err) {}
   - Runs after file is sent or error occurs
   - Useful for error handling

-------------------------------------------------
Purpose:
res.sendFile() sends a file from server to browser.

- Displays file in browser (if supported)
- Does NOT force download
- Works for HTML, TXT, images, PDF, etc.

-------------------------------------------------
IMPORTANT RULE:
res.sendFile() requires an ABSOLUTE path

Use:
__dirname → gives current folder absolute path

-------------------------------------------------
Project Structure Example:

project/
 ├── app.js
 └── files/
      └── sendfile.txt

-------------------------------------------------
Correct Usage (sendfile1):

app.get("/sendfile1", (req, res) => {
  res.sendFile(__dirname + "/files/sendfile.txt");
});

Explanation:
- __dirname = project folder path
- "/files/sendfile.txt" appended
- Full absolute path created
- File sent correctly

-------------------------------------------------
Incorrect Usage (sendfile2):

app.get("/sendfile2", (req, res) => {
  res.sendFile("/files/sendfile.txt");
});

Problem:
- Treated as system root path
- Express looks for: /files/sendfile.txt
- File usually not found
- Throws error (ENOENT)

-------------------------------------------------
Example Behavior:

/sendfile1  → Works correctly
/sendfile2  → File not found error

-------------------------------------------------
Best Practice (Recommended):

const path = require("path");

res.sendFile(
  path.join(__dirname, "files", "sendfile.txt")
);

Why better:
- Cross-platform safe
- Clean syntax
- No slash issues

-------------------------------------------------
Alternative using root option:

res.sendFile("sendfile.txt", {
  root: __dirname + "/files"
});

-------------------------------------------------

Callback Example:

res.sendFile(path, (err) => {
  if (err) {
    console.log("Error sending file");
  } else {
    console.log("File sent successfully");
  }
});

-------------------------------------------------
Difference from res.download():

res.sendFile()  → displays in browser
res.download()  → forces download

-------------------------------------------------
Quick Notes:
- Always use absolute path
- __dirname is safest
- path.join() is best practice
- sendFile does not download automatically
=================================================
*/

app.get("/sendfile1", (req, res) => {
  res.sendFile(__dirname + "/files/sendfile.txt");
});

// wrong way : will give error because it is treated as absolute path from system root
app.get("/sendfile2", (req, res) => {
  res.sendFile("/files/sendfile.txt");
}); 

app.get("/sendfile3", (req, res) => {
  res.sendFile("sendfile.txt", {
    root: __dirname + "/files",
  });
}); 

app.get("/sendfile4", (req, res) => {
  res.sendFile(__dirname + "/files/sendfile.txt", (err) => {
    if (err) {
      res.status(500).send("File not found");
    } else {
      console.log("File sent successfully");
    }
  });
}); 








/*
=================================================
Express.js res.write() and res.end() – Beginner Notes
=================================================

Syntax:
res.write(chunk [, encoding])
res.end([data] [, encoding] [, callback])

Parameters:
1. chunk (res.write only, required)
   - Data to write to the response stream
   - Can be string, buffer, or any data you want to send in parts

2. encoding (optional)
   - Character encoding (default is 'utf8')

3. data (res.end only, optional)
   - Optional data to send before ending response

4. callback (res.end only, optional)
   - Function executed after response is finished

-------------------------------------------------
Purpose:
res.write() and res.end() are lower-level methods to send response.

- res.write() → sends partial data to client, can be called multiple times
- res.end()   → signals that response is complete, optionally sends final data
- Useful when streaming data or sending in chunks
- Not commonly used in modern Express apps (res.send() or res.json() preferred)

-------------------------------------------------
Correct Usage Example:

app.get("/end", (req, res) => {
  res.write("This is only for testing"); // send partial response
  res.end();                             // finish response
});

Explanation:
- res.write() sends content to browser immediately
- res.end() closes the response stream
- Browser displays the text: "This is only for testing"

-------------------------------------------------
Alternative Usage:

app.get("/end2", (req, res) => {
  res.write("Part 1\n");
  res.write("Part 2\n");
  res.end("Final part"); // can send final chunk in res.end
});

Output in browser:
Part 1
Part 2
Final part

-------------------------------------------------
Important Notes:
- res.write() does NOT automatically set Content-Type header
- res.end() must always be called to close response
- Modern Express apps usually use res.send() for simplicity
- Use res.write() when streaming large data or sending chunks progressively

-------------------------------------------------
Difference from res.send():
res.write() + res.end()  → manual, multiple chunks allowed
res.send()               → automatically ends response, simpler

-------------------------------------------------
Quick Notes:
- res.write() → send partial data
- res.end()   → end response
- Can combine multiple writes before end
- Headers should be set before first write
=================================================
*/

app.get("/end1", (req, res) => {
  res.write("This is only for testing");
  res.end()
});

app.get("/end2", (req, res) => {
  res.write("01. This is only for testing\n");
  res.write("02. This is only for testing\n");
  res.end("Finished sending data", "utf8", () => {
    console.log("Response has been fully sent");
  });
});









/*
=================================================
Express.js res.status() – Beginner Notes
=================================================

Syntax:
res.status(statusCode)

Parameters:
1. statusCode (required)
   - HTTP status code to send to client
   - Example: 200, 404, 500

-------------------------------------------------
Purpose:
res.status() sets the HTTP status code for the response.

- Does NOT automatically send a response body
- Often chained with res.send(), res.json(), or res.render()
- Useful for custom messages with specific status codes

-------------------------------------------------
Correct Usage Example:

app.get("/status", (req, res) => {
  res.status(200).send("Hello from status 200");
});

Explanation:
- res.status(200) → sets HTTP status code 200 (OK)
- .send("Hello from status 200") → sends custom response body
- Client receives:
  - Status: 200
  - Body: "Hello from status 200"

-------------------------------------------------
Other Examples:
- res.status(404).send("Page not found")
- res.status(500).json({ error: "Internal Server Error" })

-------------------------------------------------
Difference from res.sendStatus():
- res.status() → sets status code, body must be sent separately
- res.sendStatus() → sets status code and sends default message automatically

-------------------------------------------------
Quick Notes:
- Use res.status() for custom messages with specific HTTP codes
- Can chain with res.send(), res.json(), or res.render()
- Common in APIs and error handling
=================================================
*/


app.get("/status1", (req, res) => {
  res.status(200).send("Hello from status 200");
});

app.get("/status2", (req, res) => {
  res.status(200).json({
    message: "Success",
    code: 200,
    data: { name: "asyncpranav" }
  });
});








/*
=================================================
Express.js res.sendStatus() – Beginner Notes
=================================================

Syntax:
res.sendStatus(statusCode)

Parameters:
1. statusCode (required)
   - HTTP status code to send to client
   - Example: 200, 404, 500

-------------------------------------------------
Purpose:
res.sendStatus() sets the HTTP status code and sends its default message as the response body.

- Automatically sets the HTTP status code
- Sends the standard text message for that code
- Combines res.status() + res.send() in one step

-------------------------------------------------
Common HTTP Status Codes:
- 200 → OK (success)
- 201 → Created
- 204 → No Content
- 301 → Moved Permanently
- 302 → Found (temporary redirect)
- 400 → Bad Request
- 401 → Unauthorized
- 403 → Forbidden
- 404 → Not Found
- 500 → Internal Server Error

-------------------------------------------------
Explanation:
- Sends status code to client
- Browser displays default message for code
- Useful for API responses or signaling errors

-------------------------------------------------
Difference from res.status():
- res.status(code) → sets HTTP status but does NOT send body
  Example: res.status(404).send("Page missing")
- res.sendStatus(code) → sets status AND sends default message automatically

-------------------------------------------------
Quick Notes:
- Use for quickly sending standard HTTP status messages
- Common in APIs and error handling
- Saves extra lines compared to res.status().send()
*/

app.get("/sendstatus1", (req, res) => {
  res.sendStatus(404);
});

app.get("/sendstatus2", (req, res) => {
  res.sendStatus(500);
});

app.get("/sendstatus3", (req, res) => {
  res.sendStatus(200);
});






/*
=================================================
Express.js res.headersSent – Beginner Notes
=================================================

What it is:
res.headersSent is a **boolean property** of the response object in Express.

- Indicates whether HTTP headers have already been sent to the client
- True → headers have been sent
- False → headers not yet sent

-------------------------------------------------
Purpose:
- Useful to **avoid sending headers multiple times**
- Prevents errors like: "Cannot set headers after they are sent to the client"
- Helps in debugging or conditional responses

-------------------------------------------------
Correct Usage Example:

app.get("/check", (req, res) => {
  console.log(res.headersSent); // false → headers not sent yet
  res.send("Check console of VS Code to see headersSent value");
  console.log(res.headersSent); // true → headers already sent
});

Explanation:
- Before res.send(): headersSent = false
- After res.send(): headersSent = true
- res.send(), res.json(), res.end(), res.redirect() all **send headers automatically**

-------------------------------------------------
Important Notes:
- Always check headersSent if sending multiple responses
- Prevents sending multiple res.send() or res.json() calls
- Helps in error handling and middleware

-------------------------------------------------
Example Scenario:
if (!res.headersSent) {
  res.status(200).send("Safe to send response");
}

- Ensures no "headers already sent" error occurs

-------------------------------------------------
Quick Notes:
- res.headersSent → boolean (true/false)
- True → headers already sent to client
- False → safe to modify headers or send response
- Works with res.send(), res.json(), res.render(), res.end(), res.redirect()
*/

app.get("/check", (req, res) => {
  console.log(res.headersSent)
  res.send("Check console of vs code to see the value of headersSent property");
  console.log(res.headersSent)
});






/*
=================================================
Express.js res.set() and res.get() – Beginner Notes
=================================================

Syntax:
res.set(field, value)
res.get(field)

Parameters:
1. field (required)
   - Name of the header to set or retrieve
   - Example: "Content-Type", "custom-header"

2. value (required for res.set)
   - Value of the header
   - Example: "application/json", "Hello from custom header"

-------------------------------------------------
Purpose:
- res.set() → sets HTTP headers before sending response
- res.get() → retrieves the value of a header from the response object
- Headers provide metadata to the client (browser or API)

-------------------------------------------------
Correct Usage Example:

app.get("/set", (req, res) => {
  res.set("custom-header", "Hello from custom header"); // set custom header
  console.log(res.get("custom-header"));               // get header value
  res.send("Custom header has been set. Check response headers in browser dev tools or console.");
});

Explanation:
- res.set("custom-header", "Hello from custom header") → adds header to HTTP response
- res.get("custom-header") → retrieves value for logging or debugging
- Browser can see header in DevTools → Network tab

-------------------------------------------------
Other Examples:
- Set multiple headers at once:
  res.set({
    "Content-Type": "application/json",
    "Cache-Control": "no-cache"
  });

- Retrieve header:
  const contentType = res.get("Content-Type");

-------------------------------------------------
Important Notes:
- Always set headers **before** sending the response (before res.send(), res.json(), res.end())
- Useful for custom metadata, caching, content-type, or security headers
- Standard headers: Content-Type, Cache-Control, Location, etc.
- Custom headers: any name starting with lowercase/uppercase letters

-------------------------------------------------
Quick Notes:
- res.set() → sets header
- res.get() → gets header value
- Set headers before sending response
- Custom headers can be inspected in browser dev tools or console
*/
app.get("/set", (req, res) => {
  res.set("custom-header", "Hello from custom header");
  console.log(res.get("custom-header"))
  res.send("Custom header has been set. Check response headers in browser dev tools or in vs code console.");
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
