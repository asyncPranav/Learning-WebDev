const fs = require("fs");
const a = 100;

setImmediate(() => {
  console.log("setImmediate");
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("file reading callback");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

function printA() {
  console.log("a = ", a);
}

printA();

console.log("End of the file");


// a =  100
// End of the file
// setTimeout
// setImmediate
// file reading callback
