const fs = require("fs");

setImmediate(() => {
  console.log("setImmediate");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

fs.readFile("./file.txt", "utf8", () => {
  console.log("file reading callback");
});

process.nextTick(() => {
  process.nextTick(() => console.log("inner nextTick"));
  console.log("nextTick");
});

console.log("end of the file");


// end of the file
// nextTick
// inner nextTick
// setTimeout
// setImmediate
// file reading callback

// ❗ Node does not move forward until the nextTick queue is EMPTY.
// 🔥 process.nextTick runs immediately and repeatedly until its queue is empty — even before timers, promises, and I/O.