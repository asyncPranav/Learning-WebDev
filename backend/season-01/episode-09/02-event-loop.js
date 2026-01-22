const fs = require("fs");

const a = 100;

setImmediate(() => {
  console.log("setImmediate");
});

// Promise.resolve("Promise").then(console.log);
Promise.resolve().then(() => {
  console.log("Promise");
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("file reading callback");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

process.nextTick(() => {
  console.log("process.nextTick");
});

function printA() {
  console.log("a = ", a);
}

printA();

console.log("End of the file");

// a =  100
// End of the file
// process.nextTick
// Promise
// setTimeout
// setImmediate
// file reading callback



/*
======================== NODE.JS EVENT LOOP EXPLANATION ========================

This program demonstrates how Node.js executes code using:
1. Synchronous code
2. Microtasks (process.nextTick, Promise)
3. Event Loop phases (timers, poll, check)

-------------------------------- EXECUTION ORDER -------------------------------

STEP 1: SYNCHRONOUS CODE (CALL STACK)
- All normal JavaScript code runs first, line by line.
- Functions and console.log execute immediately.

Output:
a = 100
End of the file

--------------------------------------------------------------------------------

STEP 2: MICROTASK QUEUE
After synchronous code finishes, Node.js runs microtasks.

Microtask priority:
1. process.nextTick()   → highest priority
2. Promise.then()       → runs after nextTick

So output becomes:
process.nextTick
Promise

--------------------------------------------------------------------------------

STEP 3: EVENT LOOP PHASES (MACROTASKS)

Node.js event loop phases run in this order:

1. Timers phase
   - setTimeout(..., 0) executes here

2. Poll phase
   - fs.readFile() callback executes here (I/O operation)

3. Check phase
   - setImmediate() executes here

So final output order:
setTimeout
file reading callback
setImmediate

--------------------------------------------------------------------------------

FINAL OUTPUT ORDER:

a = 100
End of the file
process.nextTick
Promise
setTimeout
file reading callback
setImmediate

--------------------------------------------------------------------------------

KEY RULES TO REMEMBER:
- Synchronous code always runs first
- process.nextTick runs before Promises
- Promises run before timers
- setImmediate runs after I/O (poll phase)
- setTimeout(0) does NOT run immediately

===============================================================================
*/
