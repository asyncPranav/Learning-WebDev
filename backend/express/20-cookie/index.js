const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Use cookie-parser middleware : without secret key, it will not sign the cookies, and the cookies will be stored in plain text. This means that anyone can read the cookie values, but they cannot modify them without knowing the secret key.
// app.use(cookieParser());

// Use cookie-parser middleware with a secret key : with a secret key, the cookies will be signed, which means that they will be stored in an encoded format. This provides an additional layer of security, as it prevents unauthorized users from tampering with the cookie values. However, it also means that the cookies cannot be easily read without the secret key.
// Signed cookie parser can handle both signed and unsigned cookies. If a cookie is signed, it will be verified using the secret key. If the verification fails, the cookie will be treated as unsigned and will be accessible through req.cookies instead of req.signedCookies.
app.use(cookieParser("secret-key"));

app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to Cookie Learning chapter.</h1> 
    <br/> <a href='/set-cookie-without-secret'>Set Cookie without Secret</a> 
    <br/> 
    <br/> 
    <a href='/get-cookie-without-secret'>Get Cookie without Secret</a> 
    <br/> 
    <br/> 
    <a href='/clear-cookie-without-secret'>Clear Cookie without Secret</a>
    <br/> 
    <br/> 
    <br/> <a href='/set-cookie-with-secret'>Set Cookie with Secret</a> 
    <br/> 
    <br/> 
    <a href='/get-cookie-with-secret'>Get Cookie with Secret</a> 
    <br/> 
    <br/> 
    <a href='/clear-cookie-with-secret'>Clear Cookie with Secret</a>`,
  );
});

// Routes -> for normal cookie without secret key
app.get("/set-cookie-without-secret", (req, res) => {
  res.cookie("username", "asyncpranav", {
    maxAge: 1000 * 60 * 15, // Cookie expires after 15 minutes
    httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
    secure: false, // Set to true if using HTTPS
  });
  res.send("Cookie has been set!");
});

app.get("/get-cookie-without-secret", (req, res) => {
  const username = req.cookies.username;
  if (!username) {
    res.send("No username cookie found.");
  } else {
    res.send(`Username: ${username}`);
  }
});

app.get("/clear-cookie-without-secret", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie has been cleared!");
});

// Routes -> for signed cookie with secret key
app.get("/set-cookie-with-secret", (req, res) => {
  res.cookie("name", "pranav singh chandel", {
    maxAge: 1000 * 60 * 15, // Cookie expires after 15 minutes
    httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
    secure: false, // Set to true if using HTTPS
    signed: true, // This will sign the cookie with the secret key provided to cookie-parser middleware
  });
  res.send("Signed cookie has been set!");
});

app.get("/get-cookie-with-secret", (req, res) => {
  const name = req.signedCookies.name; // instead of req.cookies, we use req.signedCookies to access signed cookies
  if (!name) {
    res.send("No signed name cookie found.");
  } else {
    res.send(`Signed Name: ${name}`);
  }
});

app.get("/clear-cookie-with-secret", (req, res) => {
  res.clearCookie("name");
  res.send("Signed cookie has been cleared!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});