const fs = require("fs");
const crypto = require("crypto");

/*
  crypto.pbkdf2 is a CPU-intensive operation.
  It does NOT run on the main thread.
  It runs inside the libuv thread pool.
*/

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3 - cryptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4 - cryptoPBKDF2 done");
});

// Order of execution is not defined here - which thread response earlier will get executed fast
// Thread pool tasks complete based on CPU scheduling, OS load, and execution time, not code order


/*
  IMPORTANT NOTES FOR BEGINNERS:

  1) Node.js uses a thread pool (libuv thread pool)
  2) By default, the thread pool size is 4 threads
  3) crypto.pbkdf2 uses the thread pool
  4) Only 4 tasks can run in parallel at the same time


  At this point:
  - 4 crypto.pbkdf2 tasks are already running
  - All 4 thread pool workers are busy
  - This 5th crypto task CANNOT start immediately
  - It must WAIT until any one thread becomes free
*/

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5 - cryptoPBKDF2 done");
});




/*
  We can change the number of threads used by Node.js for CPU-bound tasks 
  (like crypto.pbkdf2, zlib, fs operations) using an environment variable:

    process.env.UV_THREADPOOL_SIZE = 2;

  Key points:
  1. Default thread pool size is 4.
  2. Setting it to 2 reduces the number of threads available for heavy tasks.
  3. Fewer threads → tasks may queue → execution may take longer.
  4. More threads → more parallelism, but too many can overload CPU.
*/


