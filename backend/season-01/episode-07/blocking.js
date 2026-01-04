const crypto = require("node:crypto");

console.log("Hello world");

let a = 90;
let b = 39;

// pbkd2 : password base key derivation function 2f

// synchronous function - will block the main thread - never use it
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");
console.log("first key generated");

// asynchronous function - uses libuv thread pool
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("second key generated");
});

function multiply(a, b) {
  const result = a * b;
  return result;
}

let c = multiply(a, b);
console.log("multiplication : " + c);


/*
====================== SYNC vs ASYNC (CRYPTO) EXPLANATION =====================

1) crypto.pbkdf2Sync → SYNCHRONOUS (blocking)
   - This function blocks the MAIN THREAD.
   - JavaScript waits until the key is fully generated.
   - During this time:
       ❌ No other JS code runs
       ❌ Event loop is blocked
       ❌ App becomes slow / unresponsive
   - The call stays on the CALL STACK until completion.
   - That is why it is NOT recommended in real applications.

2) crypto.pbkdf2 → ASYNCHRONOUS (non-blocking)
   - This function does NOT block the main thread.
   - The heavy work is offloaded to libuv's THREAD POOL.
   - JavaScript continues executing the next lines immediately.
   - When the work finishes:
       → Callback is pushed to the callback queue
       → Event loop sends it back to the call stack

3) Execution order in this file:
   - "Hello world" prints first
   - pbkdf2Sync blocks everything until finished
   - "first key generated" prints AFTER sync work completes
   - async pbkdf2 starts and moves to background
   - multiply() runs immediately
   - "multiplication" prints
   - "second key generated" prints LAST (async callback)

4) Important rule:
   - Sync CPU-heavy functions = BAD (block event loop)
   - Async CPU-heavy functions = GOOD (use thread pool)

5) One-line memory tip:
   - pbkdf2Sync → "Stop everything and wait"
   - pbkdf2     → "Do it in background and continue"

=============================================================================
*/
