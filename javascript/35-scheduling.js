//-----------> Scheduling: setTimeout and setInterval

/*
    We may decide to execute a function not right now, but at a certain time later. 
    That’s called “scheduling a call”.

    There are two methods for it:
        1. setTimeout : allows us to run a function once after the interval of time.
        2. setInterval : allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

    These methods are not a part of JavaScript specification. But most environments have the 
    internal scheduler and provide these methods. In particular, they are supported in all 
    browsers and Node.js.
*/



//----------> setTimeout

/*
    The syntax:

        let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

        Parameters:

            func|code :
                Function or a string of code to execute. Usually, that’s a function. For 
                historical reasons, a string of code can be passed, but that’s not recommended.

            delay :
                The delay before run, in milliseconds (1000 ms = 1 second), by default 0.

            arg1, arg2... :
                Arguments for the function
*/



// For instance, this code calls sayHi() after one second:
function sayHi() {
    console.log("Hi");
}
setTimeout(sayHi, 1000);


// With arguments:
function sayHello(phrase, who) {
    console.log(who + ": " + phrase);
}
setTimeout(sayHello, 1000, "Hello world", "Pranav");



// If the first argument is a string, then JavaScript creates a function from it. : In browsers, setTimeout can accept a string, which is evaluated using eval() (not recommended).

// setTimeout("console.log('Hello')", 1000); // Error : In Node.js, setTimeout strictly requires the first argument to be a function, not a string.

//correct way in node.js
setTimeout( () => console.log("Hello"), 1000);
setTimeout( function() { console.log("Hello") }, 1000);
console.log("\n");









//----------------> Canceling setTimeout with clearTimeout


/*
    A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution.

    The syntax to cancel:

        let timerId = setTimeout(...);  or let timerId = setTimeout(function, delay);
        clearTimeout(timerId);
*/




// In the code below, we schedule the function and then cancel it (changed our mind). As a result, nothing happens:

let timerId = setTimeout( () => console.log("Hello world from Pranav"), 3000 );
console.log(timerId); // In node.js setTimeout returns Timeout object and in browser it returns numeric Id like 1, 2, 3

clearTimeout(timerId);
console.log(timerId);

/*
    As we can see from alert output, in a browser the timer identifier is a number. 
    In other environments, this can be something else. For instance, 
    Node.js returns a timer object with additional methods.

    Again, there is no universal specification for these methods, so that’s fine.

    For browsers, timers are described in the timers section of HTML Living Standard.
*/









//-------------------------> setInterval


/*
    The setInterval method has the same syntax as setTimeout:

    let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

    All arguments have the same meaning. But unlike setTimeout it runs the function not 
    only once, but regularly after the given interval of time.

    To stop further calls, we should call : clearInterval(timerId).
*/



//Dummy alarm that will beep after every 1 second and will stop after 5 seconds

let count = 0;
let intervalId = setInterval(() => {
    console.log("Tick " + ++count);
    if (count === 5) {
        clearInterval(intervalId);
        console.log("Stopped");
    }
}, 1000);


//another way of doing same thing

let count2 = 0;
let intervalId2 = setInterval(() => {
    console.log("beep " + ++count2);
}, 1000);

// stop after 5 seconds
setTimeout(() => {
    clearInterval(intervalId2);
    console.log("Finished");
}, 5000);








//----------------> Nested setTimeout

/*
    setTimeout is usually used once to run something after a delay.

    But nested setTimeout means calling setTimeout again inside the callback, so the 
    delay happens step by step, not all at once.

    "Nested" just means: setTimeout calls itself again from inside itself, after it finishes running.

    There are two ways of running something regularly.

    One is setInterval. The other one is a nested setTimeout, like this:
*/

/* instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

timerId = setTimeout(function tick() {
    console.log("tick");

    timerId = setTimeout(tick, 2000); // (*)
}, 2000);

/*
    The setTimeout above schedules the next call right at the end of the current one (*).

    The nested setTimeout is a more flexible method than setInterval. This way the next call 
    may be scheduled differently, depending on the results of the current one.

    For instance, we need to write a service that sends a request to the server every 5 seconds 
    asking for data, but in case the server is overloaded, it should increase the interval 
    to 10, 20, 40 seconds...

    Here’s the pseudocode:
*/


// Read more from here : 
// https://github.com/Redxcyber/Obsidian/blob/main/Javascript/Nested%20setTimeout%20with%20and%20without%20timerId.md
// https://github.com/Redxcyber/Obsidian/blob/main/Javascript/Nested%20setTimeout.md


