console.log("Hello world");

let a = 1200000000;
let b = 3400000000;

// This callback will only pushed to call stack in v8 once call stack of main thread get empty
setTimeout(() => {
  console.log("call me ASAP");
}, 0);

function multiply(a, b) {
  const result = a * b;
  return result;
}

let c = multiply(a, b);
console.log("multiplication result : "+c);

/*
===================== DETAILED ASYNC EXECUTION EXPLANATION =====================

1) Node.js uses a SINGLE-THREADED JavaScript engine (V8) with a CALL STACK
   for synchronous code and an EVENT LOOP for asynchronous code.

2) Step-by-step execution of this code:

   console.log("Hello world");
   - Synchronous
   - Executed immediately
   - Message printed
   - Call stack clears

   let a = 1200000000;
   let b = 3400000000;
   - Synchronous assignments
   - Executed immediately
   - Call stack clears

   setTimeout(() => { console.log("call me ASAP"); }, 0);
   - Asynchronous
   - Callback is registered with libuv / timer system
   - Placed in the TIMERS QUEUE
   - Even with 0ms delay, it cannot run until the call stack is empty
   - setTimeout itself finishes immediately

   function multiply(a, b) { return a * b; }
   - Synchronous function declaration
   - Stored in memory
   - Does NOT execute yet

   let c = multiply(a, b);
   - Function call pushed to CALL STACK
   - Computes a * b → 4080000000000000000
   - Returns result and assigns to c
   - Call stack clears

   console.log("multiplication result : " + c);
   - Synchronous
   - Prints the multiplication result
   - Call stack clears

3) Event loop now checks TIMERS QUEUE
   - setTimeout callback found
   - Pushed to CALL STACK
   - Executes console.log("call me ASAP")
   - Prints the message
   - Call stack clears

4) Program ends
   - No more tasks in call stack or event loop queues
   - Node process terminates

5) Key concepts to remember:

   - Synchronous code → runs immediately, blocks call stack
   - Asynchronous code → schedules work in event loop / libuv, runs later
   - setTimeout(..., 0) → runs after all synchronous code, not immediately
   - Event loop ensures async callbacks execute **after call stack is empty**
   - Output order reflects the priority:
        1. All sync code
        2. Async callbacks (timers, I/O, etc.)

6) Output of this program:

Hello world
multiplication result : 4080000000000000000
call me ASAP

7) Simple memory tip:
   - "Sync code first, async callbacks later"
   - 0ms timer ≠ instant execution
   - Node never blocks event loop for async tasks
=============================================================================
*/


/*
==================== NODE.JS EVENT LOOP VISUAL DIAGRAM ====================

  Code: 
  console.log("Hello world");
  let a = 1200000000;
  let b = 3400000000;
  setTimeout(() => { console.log("call me ASAP"); }, 0);
  function multiply(a, b) { return a * b; }
  let c = multiply(a, b);
  console.log("multiplication result : " + c);

  ============================================================================

                      ┌─────────────────────┐
                      │     MAIN STACK      │
                      │   (Call Stack)      │
                      └─────────┬───────────┘
                                │
                                ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ Synchronous code executes here:                             │
  │                                                             │
  │ console.log("Hello world")  → prints immediately            │
  │ let a = 1200000000                                          │
  │ let b = 3400000000                                          │
  │ function multiply(...)                                      │
  │ let c = multiply(a,b) → computes result                     │
  │ console.log("multiplication result : "+c)                   │
  └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                      ┌─────────────────────┐
                      │     CALL STACK      │
                      │    Empty now        │
                      └─────────┬───────────┘
                                │
                                ▼
                      ┌─────────────────────┐
                      │   EVENT LOOP        │
                      └─────────┬───────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
      ┌───────────────┐                   ┌──────────────────┐
      │  Timers Queue │                   │ Other Queues     │
      │ (setTimeout)  │                   │ (I/O, Microtasks)│
      └───────────────┘                   └──────────────────┘
              │
              ▼
      ┌───────────────────────────┐
      │ Push setTimeout callback  │
      │  to Call Stack            │
      └────────────┬──────────────┘
                   │
                   ▼
      ┌────────────────────────────┐
      │ Execute callback:          │
      │ console.log("call me ASAP")│
      └────────────┬───────────────┘
                   │
                   ▼
              ┌───────────────┐
              │ Call Stack    │
              │ Empty again   │
              └───────────────┘

=============================================================================
  Output:
  Hello world
  multiplication result : 4080000000000000000
  call me ASAP
=============================================================================
  Legend:
  - Main Stack / Call Stack → executes synchronous code
  - Event Loop → constantly monitors queues
  - Timers Queue → stores setTimeout / setInterval callbacks
  - Async callbacks execute ONLY when Call Stack is empty
*/