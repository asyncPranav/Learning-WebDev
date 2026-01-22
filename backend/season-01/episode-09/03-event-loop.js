const fs = require("fs");
const a = 100;

setImmediate(() => {
  console.log("setImmediate");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd setTimeout"), 0);
  process.nextTick(() => console.log("2nd process.nextTick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("file reading callback");
});

process.nextTick(() => console.log("process.nextTick"));

console.log("End of the file");

/*
My expectation : 
  - End of the file
  - process.nextTick
  - Promise
  - setTimeout
  - setImmediate
  - file reading callback
  - 2nd process.nextTick
  - 2nd setTimeout
  - 2nd setImmediate

Console output : 
  - End of the file
  - process.nextTick
  - Promise
  - setTimeout
  - setImmediate
  - file reading callback
  - 2nd process.nextTick
  - 2nd setImmediate
  - 2nd setTimeout


Reason :
  - when event loop is idle then it always wait at "POLL" phase therefore setImmediate execute first
  - when scheduled inside an I/O callback, setImmediate executes before setTimeout(0) because the event loop moves directly from poll to check phase
*/