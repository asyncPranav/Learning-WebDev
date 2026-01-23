const http = require("http");
const server = http.createServer(function(req, res) {
  if (req.url === "/getSecretData") {
    res.end("You are very nice person");
  }else{
    res.end("Hello world");
  }
});

// server.listen(8080);
server.listen(8080, "localhost", () => {
  console.log("server listening on: http://localhost:8080/");
});