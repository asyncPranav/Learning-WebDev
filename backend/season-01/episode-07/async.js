const fs = require("fs");
const https = require("https");

console.log("async.js file  runing");

let a = 239302;
let b = 8392290;

https.get("https://dummyjson.com/products/1", (res) => {
  res.resume(); // read note-04 from obsidian/node
  console.log("data fetched successfully");
});

setTimeout(() => {
  console.log("settimeout called after 5 seconds");
}, 5000);

fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("file data : " + data);
});

/*
======================== ASYNCHRONOUS CODE EXPLANATION ========================

1) This is ASYNCHRONOUS (non-blocking) code.

2) Asynchronous functions (like fs.readFile, https.get, setTimeout)
   REQUIRE callbacks (or promises) because:
   - The operation does NOT finish immediately.
   - JavaScript cannot wait (it must keep running).
   - So we give a callback to run LATER when the work is done.

3) What happens internally:
   - The async function is called from the CALL STACK.
   - The heavy work (file I/O, network, timer) is DELEGATED to libuv
     (thread pool / OS).
   - JavaScript execution continues without waiting.
   - When the work completes, the callback is placed in the
     appropriate queue (timer queue, I/O queue, etc.).
   - The EVENT LOOP pushes the callback back into the CALL STACK
     when it is free.

4) Because of this:
   - Code after an async call runs immediately.
   - Callbacks execute later.
   - Output order is NOT top → bottom.

5) Example behavior:
   console.log("Start");
   asyncTask();
   console.log("End");

   Output:
   Start
   End
   (asyncTask callback runs later)

6) Important note:
   - If async resources (like streams or sockets) are not closed,
     Node.js will NOT exit because the event loop is still active.

7) Simple rule to remember:
   - Sync  → "Wait, then move on"
   - Async → "Move on, then come back later"

===========================================================================
*/
