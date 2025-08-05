//-------------> Zero delay setTimeout : setTimeout(fn, 0) or setTimeout(fn)


/*
    ✅ What is setTimeout(fn, 0)?

        - setTimeout(fn, 0) schedules a function (fn) to run as soon as possible, but not immediately.
        - It waits until the current call stack is empty, then adds fn to the message queue, and only runs it when the JavaScript engine is free.
        - So the actual delay is never truly 0 — it’s usually a few milliseconds.

        
    🧠 Why not immediate?

        JavaScript is single-threaded. It runs code in the call stack, and timers like 
        setTimeout go into the message queue (or task queue).
        
        Even setTimeout(fn, 0) waits until:
        - the call stack is empty, and
        - higher priority tasks (like microtasks) are done.


*/



setTimeout(() => console.log("World"), 0);
console.log("Hello"); //output : Hello World

/*
    The first line “puts the call into calendar after 0ms”. But the scheduler will 
    only “check the calendar” after the current script is complete, so "Hello" is first, 
    and "World" – after it.
*/







// 🧪 Example 1: Basic usage
console.log("Start");

setTimeout(() => {
    console.log("Inside setTimeout with 0ms");
}, 0);

console.log("End");

/*
    Start
    End
    Inside setTimeout with 0ms
*/


/*

    ⛓️ Step-by-step Explanation (with a Timeline):

        | Time |  What happens                               | Why?                                                                                                                  |
        | ---- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
        |  1️⃣  | `console.log("Start")` runs                 | It's **synchronous** (runs immediately)                                                                               |
        |  2️⃣  | `setTimeout(...)` is **registered**         | This does **not** run the function now. It tells the browser: "Please run this after 0ms **when the stack is empty**" |
        |  3️⃣  | `console.log("End")` runs                   | Still synchronous, runs right after "Start"                                                                           |
        |  4️⃣  | The JavaScript **call stack is now empty**  | Now the browser looks at the **message queue** (timers like `setTimeout`)                                             |
        |  5️⃣  | `setTimeout` callback runs                  | Only now it executes `console.log("Inside setTimeout with 0ms")`                                                      |

    📤 What Is the Call Stack?

        The JavaScript engine runs code line by line. That’s the call stack.

        It doesn’t run setTimeout callback immediately. It waits until all 
        synchronous code (like console.log) is done. Then it runs things from the 
        message queue like setTimeout.


    📦 The Output Is Still the Same in Node.js

    🧠 Why This Happens in Node.js (Not Browser):
        Node.js uses a system called the Event Loop, just like browsers do, 
        but with some internal differences.

        When you run the code:
            - console.log("Start") is synchronous → runs first.
            - setTimeout(..., 0) is registered as a macrotask in the timer phase of Node’s event loop.
            - console.log("End") is synchronous → runs next.
            - The event loop finishes all synchronous code first.
            - Then it checks the timer queue, sees that 0ms has passed, and runs the callback.



    🕰️ Why Delay Even with 0ms?
        Even with 0ms, there's never zero delay. Node.js waits for:
            - All current synchronous code to finish
            - Then executes the timer callback after that


    
    
    🧪 Bonus: Test it with Heavy Loop
        Try this code in Node.js:

            console.log("Start");

            setTimeout(() => {
                console.log("Inside setTimeout");
            }, 0);

            for (let i = 0; i < 1e8; i++) {} // Heavy blocking loop

            console.log("End");


        📦 Output:

            Start
            End
            Inside setTimeout


        ⏳ setTimeout runs only after the heavy loop completes — not “after 0ms”.









*/










































































