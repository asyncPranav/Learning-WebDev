console.log("Start");

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");

let a = 90;
let b = 39;

// Async crypto
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("Async key generated");
});

// Sync crypto
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");
console.log("Sync key generated");

// Async file read
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("File data (async):", data);
});

// Sync file read
const syncData = fs.readFileSync("./file.txt", "utf8");
console.log("File data (sync):", syncData);

// Async HTTP
https.get("https://dummyjson.com/products/1", (res) => {
    res.on("data", chunk => {});
    res.on("end", () => console.log("HTTP response done"));
});

// Timer
setTimeout(() => { console.log("Timer done"); }, 0);

// Promise / microtask
Promise.resolve().then(() => console.log("Promise resolved"));

console.log("End");




/*

======================================================================================================
                             ┌───────────────┐
                             │  CALL STACK   │
                             │ (Sync code)   │
                             └───────┬───────┘
                                     │
                                     ▼
             ┌────────────────────────────────────────────┐
             │ Synchronous execution (top → bottom)       │
             │ - console.log("Start")                     │
             │ - crypto.pbkdf2Sync (blocks thread!)       │
             │ - console.log("Sync key generated")        │
             │ - fs.readFileSync (blocks thread!)         │
             │ - console.log("File data (sync)")          │
             │ - console.log("End")                       │
             └────────────────────────────────────────────┘
                                     │
                                     ▼
                           ┌──────────────────┐
                           │ CALL STACK empty │
                           └───────┬──────────┘
                                   │
                                   ▼
                           ┌─────────────────┐
                           │ EVENT LOOP      │
                           └───────┬─────────┘
                                   │
   ┌───────────────────────────────┼───────────────────────────────┐
   ▼                               ▼                               ▼
┌───────────────┐           ┌───────────────┐                 ┌─────────────────┐
│ TIMERS QUEUE  │           │ I/O QUEUE     │                 │ MICROTASKS      │
│ setTimeout    │           │ fs.readFile,  │                 │ Promises        │
│               │           │ https.get     │                 │ process.nextTick│
└───────────────┘           └───────────────┘                 └─────────────────┘
        │                            │                                │
        ▼                            ▼                                ▼
Push setTimeout callback        Push async callbacks           Push promise callbacks
to CALL STACK when empty         to CALL STACK when empty      to CALL STACK immediately
        │                            │                                │
        ▼                            ▼                                ▼
┌───────────────────────────┐  ┌────────────────────────────┐  ┌───────────────────────────┐
│ Execute timer callback    │  │ Execute async file / crypto│  │ Execute promise callback  │
│ console.log("Timer done") │  │ console.log("File data...")│  │ console.log("Promise...") │
│                           │  │ console.log("Async key")   │  │                           │
└───────────────────────────┘  └────────────────────────────┘  └───────────────────────────┘

==============================================================================================================
Legend:

1) CALL STACK → executes **synchronous code only**. Blocks everything else.
2) EVENT LOOP → constantly checks queues for async callbacks.
3) TIMERS QUEUE → setTimeout / setInterval callbacks.
4) I/O QUEUE → async fs, https, async crypto, etc.
5) MICROTASKS → Promises, process.nextTick, executed **before timers**.
6) Async callbacks execute **only when call stack is empty**.
7) Synchronous heavy work (sync crypto, fs.readFileSync) **blocks** the call stack.
8) Event loop ensures Node.js remains non-blocking where possible for async tasks.

Output :
- Start
- Sync key generated
- File data (sync): This file.txt has to be read by async.js
- End
- Promise resolved
- Timer done
- Async key generated
- File data (async): This file.txt has to be read by async.js
- HTTP response done

*/