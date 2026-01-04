const fs = require("fs");

console.log("Start sync");

// Sync functions do not use callbacks because execution is blocking.
// The call stays on the call stack until the operation finishes.
// Synchronous functions do not use callbacks because the JavaScript thread is blocked until the operation completes, so the result can be returned directly.
const data = fs.readFileSync("./file.txt", "utf8");

console.log("File data:", data);
console.log("End sync");

/*
======================== SYNCHRONOUS CODE EXPLANATION ========================

1) This is SYNCHRONOUS (blocking) code.

2) Synchronous functions (like fs.readFileSync) DO NOT use callbacks.
   Reason:
   - The JavaScript thread waits (blocks) until the operation finishes.
   - The result is returned directly.
   - Since the result is available immediately, no callback is needed.

3) What happens internally:
   - The function call stays on the CALL STACK.
   - Node.js waits until the file is completely read.
   - After completion, the data is returned.
   - Only then does the next line of code execute.

4) In synchronous code:
   - There is NO delegation to libuv.
   - There is NO event loop involvement.
   - Execution order is top → bottom (line by line).

5) Callbacks are mainly used in ASYNCHRONOUS code because:
   - Async operations do NOT block the call stack.
   - Work is sent to libuv (thread pool / OS).
   - Once the work is done, the callback is pushed back
     into the call stack via the event loop.

6) Simple rule to remember:
   - Sync  → "Wait and then move on"
   - Async → "Move on and come back later"

===========================================================================
*/

