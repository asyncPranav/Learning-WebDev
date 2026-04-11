const express = require("express");
const app = express();
const PORT = 3000;

/*
=================================================
Express.js app.set() and express.json() – Beginner Notes
=================================================

Statements:
app.set("view engine", "ejs");
app.use(express.json());

-------------------------------------------------
1. app.set("view engine", "ejs")

Purpose:
- Sets EJS as the template/view engine for Express
- Allows rendering dynamic HTML using res.render()

How it works:
- Express automatically looks inside "views" folder
- You don't need to write ".ejs" extension
- Express converts EJS template into HTML

Example:
res.render("home")

Express will load:
views/home.ejs

-------------------------------------------------
Default Folder Structure:

project/
 ├── app.js
 └── views/
      ├── home.ejs
      └── about.ejs

-------------------------------------------------
Important Notes:
- "views" folder is default (can be changed)
- EJS must be installed first
- Used with res.render()

Install EJS:
npm install ejs

-------------------------------------------------
2. app.use(express.json())

Purpose:
- Parses incoming JSON data from client
- Converts JSON body into JavaScript object
- Makes data available in req.body

Without this:
req.body will be undefined

-------------------------------------------------
Example Request (Client sends JSON):

POST /users
Content-Type: application/json

{
  "name": "Pranav",
  "age": 25
}

-------------------------------------------------
After express.json():

req.body becomes:
{
  name: "Pranav",
  age: 25
}

-------------------------------------------------
Important Notes:
- Used for APIs
- Required for POST, PUT, PATCH requests
- Only parses JSON body
- Must be placed before routes

-------------------------------------------------
Example Order:

app.use(express.json());

app.post("/user", (req, res) => {
  console.log(req.body);
});

-------------------------------------------------
Difference:

app.set("view engine", "ejs")
→ Used for rendering views (frontend templates)

app.use(express.json())
→ Used for parsing incoming JSON (API/backend)

-------------------------------------------------
Quick Notes:
- app.set() → configure Express settings
- view engine → enables template rendering
- express.json() → parses JSON request body
- Must call before routes


-------------------------------------------------
3. app.use(express.urlencoded({ extended: false }))

Purpose:
- Parses URL-encoded form data
- Used when data comes from HTML forms
- Stores parsed data inside req.body

Used for:
- HTML form submissions
- application/x-www-form-urlencoded
- Traditional form POST requests

Example HTML Form:

<form method="POST" action="/user">
  <input name="name" />
  <input name="age" />
</form>

Submitted Data:
name=pranav&age=25

req.body becomes:
{
  name: "pranav",
  age: "25"
}

-------------------------------------------------
extended option:

extended: false
- Uses simple querystring library
- Supports only simple key-value pairs

Example supported:
name=pranav&age=25

Not supported:
user[name]=pranav

-------------------------------------------------
extended: true
- Uses qs library
- Supports nested objects

Example:
user[name]=pranav&user[age]=25

req.body becomes:
{
  user: {
    name: "pranav",
    age: "25"
  }
}

-------------------------------------------------
Order Important:

These middleware should be placed before routes

Correct order:

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/user", (req, res) => {
  console.log(req.body);
});

-------------------------------------------------
Difference Summary:

express.json()
→ parses JSON body

express.urlencoded()
→ parses form data

Both store result in:
req.body

-------------------------------------------------
Quick Notes:
- express.json() → API JSON data
- express.urlencoded() → HTML form data
- extended false → simple data
- extended true → nested objects
- Must use before routes
=================================================
*/
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home page");
});









/*
=================================================
Express.js req.body – Parsing Request Body Notes
=================================================

Code:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/body", (req, res) => {
  res.send(req.body);
});

-------------------------------------------------
Purpose:
This setup allows Express to read data sent from client
and access it using req.body.

- express.json() → parses JSON request body
- express.urlencoded() → parses form data
- req.body → contains parsed request data

-------------------------------------------------
Middleware Used:

1. express.json()
- Parses JSON data from client
- Used for APIs and frontend fetch/axios requests
- Content-Type: application/json

Example JSON request:
{
  "name": "pranav",
  "age": 25
}

req.body becomes:
{
  name: "pranav",
  age: 25
}

-------------------------------------------------
2. express.urlencoded({ extended: false })

- Parses HTML form data
- Content-Type: application/x-www-form-urlencoded
- Used for traditional form submissions

Example form data:
name=pranav&age=25

req.body becomes:
{
  name: "pranav",
  age: "25"
}

-------------------------------------------------
Route Example:

app.post("/body", (req, res) => {
  res.send(req.body);
});

Explanation:
- Client sends data to /body
- Middleware parses request body
- req.body contains parsed data
- res.send(req.body) sends same data back

-------------------------------------------------
Example Requests:

POST /body
Content-Type: application/json

{
  "name": "pranav"
}

Response:
{
  "name": "pranav"
}

-------------------------------------------------
HTML Form Example:

<form method="POST" action="/body">
  <input name="name">
  <input name="age">
  <button type="submit">Send</button>
</form>

Submitted:
name=pranav&age=25

Response:
{
  name: "pranav",
  age: "25"
}

-------------------------------------------------
IMPORTANT:
- Must use middleware BEFORE routes
- Otherwise req.body will be undefined

Wrong order:

app.post("/body", ...)
app.use(express.json())

Correct order:

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post("/body", ...)

-------------------------------------------------
Quick Notes:
- req.body → holds request data
- express.json() → parses JSON
- express.urlencoded() → parses form data
- Only works for POST, PUT, PATCH
- Middleware must be before routes
*/
app.post("/body", (req, res) => {
  res.send(req.body);
});









/*
=================================================
Express.js req.hostname – Beginner Notes
=================================================

Syntax:
req.hostname

Type:
- String property
- Read-only request property

-------------------------------------------------
Purpose:
req.hostname returns the **hostname** of the incoming request.

- Extracts host name from the request URL
- Does NOT include protocol (http/https)
- Does NOT include port number
- Only returns domain / host

-------------------------------------------------
Example Route:

app.get("/hostname", (req, res) => {
  res.send(req.hostname);
});

-------------------------------------------------
Example Requests:

Request URL:
http://localhost:3000/hostname

Output:
localhost

-------------------------------------------------

Request URL:
http://example.com/hostname

Output:
example.com

-------------------------------------------------

Request URL:
http://127.0.0.1:3000/hostname

Output:
127.0.0.1

-------------------------------------------------
Important Notes:

- req.hostname does NOT return port
- req.hostname does NOT return protocol
- req.hostname only returns domain/host
- Useful for multi-domain apps
- Helpful for logging request origin

-------------------------------------------------
Difference:

req.hostname → only hostname
req.host     → hostname + port (via headers)
req.protocol → http or https
req.url      → full path after domain

-------------------------------------------------
Quick Notes:
- req.hostname → returns domain name
- Does not include port
- Does not include protocol
- Used to identify request host
*/
app.get("/hostname", (req, res) => {
  res.send(req.hostname);
});









/*
=================================================
Express.js req.ip and req.ips – Beginner Notes
=================================================

Syntax:
req.ip
req.ips

Type:
- Request properties
- Read-only
- req.ip  → String
- req.ips → Array

-------------------------------------------------
Purpose:

req.ip
- Returns single client IP address
- Most commonly used
- Works when there is no proxy

req.ips
- Returns array of IP addresses
- Used when request passes through proxies
- Works only when "trust proxy" is enabled

-------------------------------------------------
Example Routes:

app.get("/ip", (req, res) => {
  res.send(req.ip);
});

app.get("/ips", (req, res) => {
  res.send(req.ips);
});

-------------------------------------------------
Example Outputs:

Localhost request:

/ip  → "::1"
/ips → []

Explanation:
- Only one IP exists
- No proxy involved
- req.ips returns empty array

-------------------------------------------------
Behind Proxy Example:

Client → Proxy → Server

X-Forwarded-For header:
clientIP, proxy1, proxy2

req.ip  → first IP (client IP)
req.ips → ["clientIP", "proxy1", "proxy2"]

Example:

req.ip:
49.36.120.15

req.ips:
[
  "49.36.120.15",
  "192.168.1.1",
  "10.0.0.1"
]

-------------------------------------------------
IMPORTANT:
req.ips works only when trust proxy enabled

Enable it using:

app.set("trust proxy", true);

Otherwise:
req.ips → always empty []

-------------------------------------------------
Difference:

req.ip
- Returns single IP
- Works without proxy
- Most commonly used

req.ips
- Returns multiple IPs
- Works with proxy
- Returns array

-------------------------------------------------
Quick Notes:
- req.ip → single client IP
- req.ips → multiple IPs (array)
- req.ips needs trust proxy enabled
- req.ip returns first IP
- Useful for logging and security
*/
app.get("/ip", (req, res) => {
  res.send(req.ip);
});
app.get("/ips", (req, res) => {
  res.send(req.ips);
});









/*
=================================================
Express.js req.method – Beginner Notes
=================================================

Syntax:
req.method

Type:
- String property
- Read-only request property

-------------------------------------------------
Purpose:
req.method returns the **HTTP method** used in the request.

- It tells what type of request the client made
- Useful for controlling logic based on request type
- Common in APIs and routing decisions

-------------------------------------------------
Common HTTP Methods:
- GET    → Read data (fetch from server)
- POST   → Send data (create new data)
- PUT    → Update full data
- PATCH  → Update partial data
- DELETE → Remove data

-------------------------------------------------
Example Route:

app.get("/method", (req, res) => {
  res.send(req.method);
});

-------------------------------------------------
Example Output:

Request:
GET /method

Response:
"GET"

-------------------------------------------------
Other Example Scenarios:

If same route is used with different methods:

GET /method   → "GET"
POST /method  → "POST"
PUT /method   → "PUT"

-------------------------------------------------
Important Notes:

- req.method always returns uppercase string
- Helps in request handling logic
- Useful in middleware for logging or security checks
- Often used in REST APIs

-------------------------------------------------
Example Use Case:

if (req.method === "POST") {
  // handle data creation
}

if (req.method === "GET") {
  // handle data fetching
}

-------------------------------------------------
Quick Notes:
- req.method → shows HTTP method type
- Always uppercase (GET, POST, etc.)
- Useful for API logic control
- Works in all Express routes
*/
app.get("/method", (req, res) => {
  res.send(req.method);
});









/*
=================================================
Express.js req.originalUrl – Beginner Notes
=================================================

Syntax:
req.originalUrl

Type:
- String property
- Read-only request property

-------------------------------------------------
Purpose:
req.originalUrl returns the **original request URL**
that the client used to make the request.

- Includes path + query string (if present)
- Useful for logging and debugging
- Shows exact URL received by server

-------------------------------------------------
What it contains:
- Route path
- Query parameters (if any)

-------------------------------------------------
Example Route:

app.get("/originalurl", (req, res) => {
  res.send(req.originalUrl);
});

-------------------------------------------------
Example Outputs:

Request:
http://localhost:3000/originalurl

Response:
"/originalurl"

-------------------------------------------------

Request with query:
http://localhost:3000/originalurl?name=pranav&age=25

Response:
"/originalurl?name=pranav&age=25"

-------------------------------------------------
Important Notes:

- req.originalUrl includes query string
- It shows full route path as received by Express
- Useful for logging requests in middleware
- Different from req.url in some middleware cases

-------------------------------------------------
Difference:

req.originalUrl
- Full original request path
- Includes query parameters
- Best for logging/debugging

req.url
- May change inside routers/middleware
- Can be modified during routing

-------------------------------------------------
Quick Notes:
- req.originalUrl → full requested URL path
- Includes query string
- Useful for debugging/logging
- Shows exact request received
*/
app.get("/originalurl", (req, res) => {
  res.send(req.originalUrl);
});









/*
=================================================
Express.js req.path – Beginner Notes
=================================================

Syntax:
req.path

Type:
- String property
- Read-only request property

-------------------------------------------------
Purpose:
req.path returns the **URL path part only** of the request.

- It does NOT include query parameters
- It does NOT include hostname or port
- It only gives the route path used

-------------------------------------------------
What it contains:
- Only the endpoint path after domain
- Clean route path without extra data

-------------------------------------------------
Example Route:

app.get("/path", (req, res) => {
  res.send(req.path);
});

-------------------------------------------------
Example Outputs:

Request:
http://localhost:3000/path

Response:
"/path"

-------------------------------------------------

Request with query:
http://localhost:3000/path?name=pranav&age=25

Response:
"/path"

-------------------------------------------------
Important Notes:

- req.path ignores query parameters completely
- Always returns only route path
- Useful for route-based logic and middleware checks
- Cleaner than req.originalUrl when query is not needed

-------------------------------------------------
Difference:

req.path
- Only route path
- No query string
- Example: "/path"

req.originalUrl
- Full URL path + query string
- Example: "/path?name=pranav"

-------------------------------------------------
Quick Notes:
- req.path → only URL path
- No query parameters included
- Useful for routing logic
- Clean version of request URL
*/
app.get("/path", (req, res) => {
  res.send(req.path);
});









/*
=================================================
Express.js req.protocol and req.secure – Beginner Notes
=================================================

Syntax:
req.protocol
req.secure

Type:
- req.protocol → String property
- req.secure   → Boolean property
- Both are read-only request properties

-------------------------------------------------
1. req.protocol

Purpose:
- Returns the protocol used in the request
- Tells whether request is HTTP or HTTPS

Possible Values:
- "http"
- "https"

Example Route:

app.get("/protocol", (req, res) => {
  res.send(req.protocol);
});

Example Outputs:

Request:
http://localhost:3000/protocol

Response:
"http"

Request:
https://example.com/protocol

Response:
"https"

-------------------------------------------------
2. req.secure

Purpose:
- Returns whether the request is secure (HTTPS or not)

Possible Values:
- true  → HTTPS request
- false → HTTP request

Example Route:

app.get("/secure", (req, res) => {
  res.send(req.secure);
});

Example Outputs:

Request:
http://localhost:3000/secure

Response:
false

Request:
https://example.com/secure

Response:
true

-------------------------------------------------
Important Notes:

- req.protocol depends on how request is made (http or https)
- req.secure is true only when HTTPS is used
- On localhost, req.secure is usually false (because HTTP is used)
- Behind proxy (like nginx or cloudflare), values may not be accurate unless configured

-------------------------------------------------
Behind Proxy Case:

If app is behind proxy, enable:

app.set("trust proxy", true);

Then:
- req.protocol becomes accurate
- req.secure works correctly for HTTPS detection

-------------------------------------------------
Difference:

req.protocol
- Returns "http" or "https"
- String value

req.secure
- Returns true or false
- Boolean value

-------------------------------------------------
Quick Notes:
- req.protocol → shows protocol type
- req.secure → checks if HTTPS is used
- Useful for security checks and redirects
- Enable trust proxy for real-world deployments
*/
app.get("/protocol", (req, res) => {
  res.send(req.protocol);
});
app.get("/secure", (req, res) => {
  res.send(req.secure);
});









/*
=================================================
Express.js req.route – Beginner Notes
=================================================

Syntax:
req.route

Type:
- Object property (read-only)
- Contains information about the matched route

-------------------------------------------------
Purpose:
req.route gives details about the **current matched route definition**.

- Shows route path pattern
- Shows HTTP methods supported by that route
- Useful for debugging and route inspection

-------------------------------------------------
What req.route contains:
- path   → route pattern (e.g. "/route2/:userid")
- stack  → internal middleware stack for the route
- methods → object showing allowed HTTP methods

-------------------------------------------------
Example Route 1:

app.get("/route1", (req, res) => {
  res.send(req.route);
});

Example Output:
{
  path: "/route1",
  methods: { get: true }
}

-------------------------------------------------
Example Route 2:

app.get("/route2/:userid", (req, res) => {
  res.send(req.route);
});

Example Output:
{
  path: "/route2/:userid",
  methods: { get: true }
}

-------------------------------------------------
Important Notes:

- req.route only works when a route is matched
- It does NOT work in middleware that is not tied to a specific route
- It is mainly used for debugging or introspection
- Shows route definition, not actual request data

-------------------------------------------------
Difference:

req.route
- Shows matched route configuration
- Includes path pattern and methods
- Debugging purpose

req.path
- Shows actual URL path used by client
- Example: "/route2/123"

req.originalUrl
- Full URL including query string
- Example: "/route2/123?name=pranav"

-------------------------------------------------
Quick Notes:
- req.route → route definition info
- Useful for debugging routes
- Shows path + allowed methods
- Only available after route is matched
*/
app.get("/route1", (req, res) => {
  res.send(req.route);
});
app.get("/route2/:userid", (req, res) => {
  res.send(req.route);
});









// ------------------REQUEST-METHODS--------------------

/*
=================================================
Express.js req.accepts() – Beginner Notes
=================================================

Syntax:
req.accepts(types)

Type:
- Method on request object
- Returns best matching content type OR false

-------------------------------------------------
Purpose:
req.accepts() is used to check what type of response
the client (browser or API consumer) prefers.

- Used for content negotiation
- Server can respond differently based on client preference
- Common in APIs and advanced web apps

-------------------------------------------------
How it works:
Client sends "Accept" header, like:
Accept: text/html
Accept: application/json
Accept: application/xml

Server checks this header using req.accepts()

-------------------------------------------------
Return Behavior:
- Returns the best matching type (string)
- Returns false if none match

-------------------------------------------------
Example Route:

app.get("/accepts", (req, res) => {
  if (req.accepts("html")) {
    res.send("<h1>hello html</h1>");
  } else if (req.accepts("json")) {
    res.send({ message: "hello json" });
  } else if (req.accepts("xml")) {
    res.send("<message>hello xml</message>");
  } else {
    res.send("content type not supported.");
  }
});

-------------------------------------------------
Step-by-step Flow:

1. Browser/API sends request with Accept header
2. Server checks supported formats:
   - HTML
   - JSON
   - XML
3. First matching type is used
4. Response is sent accordingly

-------------------------------------------------
Example Cases:

Case 1:
Accept: text/html
→ Response: "<h1>hello html</h1>"

Case 2:
Accept: application/json
→ Response: { message: "hello json" }

Case 3:
Accept: application/xml
→ Response: "<message>hello xml</message>"

Case 4:
Accept: unknown type
→ Response: "content type not supported."

-------------------------------------------------
Important Notes:

- req.accepts() reads "Accept" header from client
- Helps in building flexible APIs
- Common in REST APIs and backend systems
- Always returns first matching supported type

-------------------------------------------------
Difference:

req.accepts()
- Checks what response format client wants
- Used for content negotiation

res.json() / res.send()
- Actually sends response

-------------------------------------------------
Quick Notes:
- req.accepts() → checks client preferred format
- Used for HTML, JSON, XML responses
- Based on Accept header
- Used in API response design
*/
app.get("/accepts", (req, res) => {
  if (req.accepts("html")) {
    res.send("<h1>hello html</h1>");
  } else if (req.accepts("json")) {
    res.send({ message: "hello json" });
  } else if (req.accepts("xml")) {
    res.send("<message>hello xml</message>");
  } else {
    res.send("content type not supported.");
  }
});









/*
=================================================
Express.js req.get() and req.headers – Beginner Notes
=================================================

Syntax:
req.get(field)
req.headers

Type:
- req.get() → method
- req.headers → object

-------------------------------------------------
1. req.get()

Purpose:
- Used to get a specific HTTP request header value
- Safer and recommended way to access headers

Syntax:
req.get("Header-Name")

Example:
req.get("Host")

-------------------------------------------------
Example Route:

app.get("/get", (req, res) => {
  res.send(req.get("Host"));
});

Explanation:
- "Host" header contains domain + port info
- Example output: "localhost:3000"

-------------------------------------------------
Important Notes for req.get():
- Case-insensitive (host, Host, HOST all work)
- Returns header value as string
- Returns undefined if header not found
- Commonly used headers: Host, User-Agent, Accept

-------------------------------------------------
2. req.headers

Purpose:
- Contains ALL request headers sent by client
- Returns an object

Example Route:

app.get("/headers", (req, res) => {
  res.send(req.headers);
});

-------------------------------------------------
Example Output (req.headers):

{
  host: "localhost:3000",
  "user-agent": "Mozilla/5.0 ...",
  accept: "text/html",
  connection: "keep-alive"
}

-------------------------------------------------
Important Notes for req.headers:

- It is a plain JavaScript object
- All header keys are in lowercase
- You can access values like:
  req.headers.host
  req.headers["user-agent"]

- Useful for debugging and authentication systems

-------------------------------------------------
Difference:

req.get()
- Gets a single header value
- Cleaner and safer

req.headers
- Returns all headers
- Full object access

-------------------------------------------------
Quick Notes:
- req.get("Host") → get specific header
- req.headers → get all headers
- headers contain metadata about request
- headers are always lowercase keys
*/
app.get("/get", (req, res) => {
  res.send(req.get("Host"));
});
app.get("/headers", (req, res) => {
  res.send(req.headers); // headers is an object you can access any key of it via dot , ex : req.headers.host
});









/*
=================================================
Express.js req.is() – Beginner Notes
=================================================

Syntax:
req.is(type)

Type:
- Method on request object
- Returns matching content-type OR false

-------------------------------------------------
Purpose:
req.is() is used to check the **Content-Type** of the incoming request body.

- Helps server understand what data client is sending
- Used in POST, PUT, PATCH requests
- Important for APIs and form handling

-------------------------------------------------
How it works:
Client sends header:
Content-Type: application/json
OR
Content-Type: text/html
OR
Content-Type: application/x-www-form-urlencoded

Server checks this using req.is()

-------------------------------------------------
Return Behavior:
- Returns matching type string if it matches
- Returns false if it does not match

-------------------------------------------------
Example Route:

app.post("/is", (req, res) => {
  if (req.is("application/json")) {
    res.send("json data");
  } else if (req.is("text/html")) {
    res.send("html data");
  } else {
    res.status(400).send("unknown data type");
  }
});

-------------------------------------------------
Step-by-step Flow:

1. Client sends POST request with Content-Type header
2. Server checks request type using req.is()
3. Matches against supported types:
   - application/json
   - text/html
4. Sends response based on match
5. If no match → returns error response

-------------------------------------------------
Example Cases:

Case 1:
Content-Type: application/json
→ Response: "json data"

Case 2:
Content-Type: text/html
→ Response: "html data"

Case 3:
Content-Type: text/plain
→ Response: "unknown data type" (400)

-------------------------------------------------
Important Notes:

- req.is() checks ONLY Content-Type header
- Mostly used in POST/PUT/PATCH requests
- Helps validate incoming request format
- Returns false if no match found

-------------------------------------------------
Difference:

req.is()
- Checks incoming request body type (Content-Type)
- Used for validation

req.accepts()
- Checks response type client wants (Accept header)
- Used for content negotiation

-------------------------------------------------
Quick Notes:
- req.is() → checks request body type
- Works with Content-Type header
- Used in POST APIs
- Helps validate incoming data format
*/
app.post("/is", (req, res) => {
  if (req.is("application/json")) {
    res.send("json data");
  } else if (req.is("text/html")) {
    res.send("html data");
  } else {
    res.status(400).send("unknown data type");
  }
});




// server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
