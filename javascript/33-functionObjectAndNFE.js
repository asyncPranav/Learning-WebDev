/*
    As we already know, a function in JavaScript is a value.

    Every value in JavaScript has a type. What type is a function?

    In JavaScript, functions are objects.

    A good way to imagine functions is as callable “action objects”. We can not only call them, 
    but also treat them as objects: add/remove properties, pass by reference etc.
*/










//-----------------> The “name” property : Returns the function’s name.


// 1. Named Function

function sayHi() {
    console.log("Hii");
}
console.log(sayHi.name);



// 2. Anonymous Function Assigned to a Variable

let sayHello = function() {
    console.log("Hello");
}
console.log(sayHello.name);

// It also works if the assignment is done via a default value:
function f(sayHiParam = function () {}) {
    console.log(sayHiParam.name);
}
f();



// 3. arrow function

let sayWelcome = () => console.log("Welcome");
console.log(sayWelcome.name);



// 4. Function in Object

let user = {
    name : "Pranav",
    greet() {
        console.log(`Hello ${this.name}`);
    }
}
console.log(user.greet.name);




// 5. Functions without name : In that case, the name property is empty ("")

let arr = [ function(){} ];
console.log( arr[0].name ); // <empty string> : the engine has no way to set up the right name, so there is none
console.log("\n");











//---------------> The “length” property : The .length property of a function tells you how many parameters the function is declared with (not how many were passed in).

/*
    🧮 Syntax: 
        functionName.length


    ✅ Use Cases
        - To inspect function arity (how many arguments it's designed to take)
        - For frameworks or libraries that handle dynamic behavior based on expected argument count


    ❗ Note:
        - .length does not tell how many arguments were actually passed during call.
        - Use arguments.length inside a function or check manually if needed.
*/


// 1. Simple function

function greet() {}
console.log(greet.length);

function welcome(name) {}
console.log(welcome.length);



// 2. Function with default value

function add(a, b = 5) {}
console.log(add.length);



// 3. Rest parameters

function sumAll(a, b, ...arg) {}
console.log(sumAll.length);


/*
    Great! Let's understand the difference between:

        - function.length → gives the declared parameters
        - arguments.length → gives the number of arguments actually passed when the function is called
*/

function showDetails(name, age, city) {
    console.log("Declared params:", showDetails.length);
    console.log("Arguments passed:", arguments.length); 
    console.log("Name:", name);
    console.log("Age:", age);
    console.log("City:", city);
}
showDetails("Pranav", 22);
console.log("\n");












//--------------------> Adding custom properties


/*
    📘 What Are Custom Properties on Functions?

        In Javascript, Functions are objects, so you can attach custom key-value pairs (properties) 
        to them just like regular objects.



    ✅ Syntax
    
        function myFunction() {}
        myFunction.customProperty = value;



    🧠 Why It Works

        A function is an instance of the Function object. This means:

            function sayHello() {}
            typeof sayHello;         // "function"
            typeof Function;         // "function"
            sayHello instanceof Object; // true

            So you can do:

            sayHello.author = "Pranav";
            sayHello.version = "1.0";



    📌 Why is this possible?

        Because functions are first-class objects, you can:
            - Store data on them
            - Pass them around like variables
            - Add or remove properties dynamically


    ⚠️ Warning:
        
        - These properties are not standard metadata — they’re just custom keys.
        - Avoid naming conflicts with real built-in properties like name, length, prototype.



    💡 Real-World Use Cases

        | Use Case                      | Example                            |
        | ----------------------------  | ---------------------------------- |
        | ✅ Counter                    | How many times a button is clicked |
        | ✅ Flagging special functions | e.g., mark `fn.isAdminOnly = true` |
        | ✅ Metadata                   | For docs or debugging              |
        | ✅ Lightweight caching        | Store results temporarily          |
        | ✅ Logging info               | Author, version, etc.              |

    
*/


// 1. Simple property
function greet(name) {
    return `Hello, ${name}`;
}
greet.language = "English";

console.log(greet);
console.log(greet.language); // "English"





// 2. Counting how many times a function is called
function ping() {
    ping.counter++;
    console.log("Ping!");
}
ping.counter = 0;

ping();
ping();
ping();

console.log("Called", ping.counter, "times"); // 3





// 3. Flag a function
function sendEmail() {}
sendEmail.isSecure = true;

if (sendEmail.isSecure) {
    console.log("Email will be encrypted.");
}





// 4. Store configuration
function connectDB() {}
connectDB.host = "localhost";
connectDB.port = 3306;

console.log(`Connecting to ${connectDB.host}:${connectDB.port}`);





// 5. Metadata for debugging
function calculate() {}
calculate.author = "Pranav";
calculate.createdOn = "2025-06-20";

console.log(calculate.author);     // Dev
console.log(calculate.createdOn);  // 2025-06-06





// 6. Storing cached data (poor man's memoization)
function square(n) {
    if (square.cache[n]) {
        return square.cache[n];
    }

    let result = n * n;
    square.cache[n] = result;
    return result;
}
square.cache = {};

console.log(square(4)); // 16
console.log(square(4)); // 16 (from cache)
console.log(square.cache); // { 4: 16 }
console.log("\n");

/*
    📌 Example: Caching results using custom function properties (Poor Man's Memoization)

    ✅ This function saves (caches) the square of a number so that if we 
    call it again with the same input, it doesn't recalculate — it just returns the saved result.

    🧠 Why this works:
        - In JavaScript, functions are also objects.
        - So we can create a custom property on the function, like `square.cache = {}`
        - Inside the function, we check if the result for a given input `n` already exists in the cache.
        - If yes ➝ return the saved result (faster!)
        - If no  ➝ calculate it, save it in the cache, and return

    🧪 This is useful when:
        - The calculation is heavy (like in real apps: searching, fetching, or computing)
        - You want to improve performance

    This is a basic form of "memoization" — an optimization technique.
*/













//---------------> Function constructor


/*
    The Function constructor is a way to create functions dynamically from strings.

    🧪 Syntax: new Function([arg1, arg2, ...,] functionBody)

        - All arguments are strings.
        - Last argument is the body of the function.
        - All other arguments are parameter names.

*/


// basic example
sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 3)); // 5

// Here, you're building a function at runtime. It behaves like:
function sum(a, b) {
    return a + b;
}



// 🎯 Use Cases


// 1. Dynamic Formula Evaluation

let userFormula = "x * y + 10";
let calc = new Function("x", "y", `return ${userFormula}`);
console.log(calc(5, 3)); // 5*3 + 10 = 25



// 2. Building a Function from Strings
greet = new Function("name", "return `Hello ${name}`;");
console.log(greet("Pranav")); //  Hello, Pranav!



// 3. No Parameters
sayHi = new Function("console.log('Hi!')");
sayHi(); // Hi!



// 4. Inside Another Function
function createPowerFunction(exp) {
  return new Function("x", `return x ** ${exp}`);
}

square = createPowerFunction(2);
let cube = createPowerFunction(3);

console.log(square(4)); // 16
console.log(cube(2));   // 8

//read more from Obsidian/Javascript
console.log("\n");











//-----------------> Named Function Expression

/*
    A Named Function Expression is when you assign a function with a name to a variable.

        const greet = function sayHello(name) {
            return "Hello, " + name;
        };

        - sayHello is the internal name of the function.
        - greet is the external variable holding the function.



    📌 Syntax

        const variableName = function functionName(params) {
            // code
        };



    🤔 Why use a Named Function Expression?

        - Helps with debugging: The function name appears in stack traces or error messages.
        - You can call the function recursively (the function calls itself).
        - Safer for self-reference (e.g. in recursive timers).

*/



// For instance, let’s take an ordinary Function Expression:
sayHi = function(who) {
    console.log(`Hello, ${who}`);
};


// And add a name to it:
sayHi = function func(who) {
    console.log(`Hello, ${who}`);
};

sayHi("Pranav");


/*
    Did we achieve anything here? What’s the purpose of that additional "func" name?

    First let’s note, that we still have a Function Expression. Adding the name "func" after 
    function did not make it a Function Declaration, because it is still created as a 
    part of an assignment expression.

    Adding such a name also did not break anything.

    The function is still available as sayHi():

    There are two special things about the name func, that are the reasons for it:
        - It allows the function to reference itself internally.
        - It is not visible outside of the function.

    For instance, the function sayHi below calls itself again with "Guest" if no who is provided:
*/


sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Guest");
    }
};

sayHi("Pranav singh chandel"); // Hello, Pranav singh chandel
sayHi(); // Hello, Guest

// func(); // Error: func is not defined (not visible outside of the function)


/*
    Why do we use func? Maybe just use sayHi for the nested call?

    Actually, in most cases we can:
*/

sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        sayHi("Guest");
    }
};

sayHi("Pranav singh"); // Hello, Pranav singh
sayHi(); // Hello, Guest


/*
    The problem with that code is that sayHi may change in the outer code. If the function 
    gets assigned to another variable instead, the code will start to give errors:
*/

sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        sayHi("Guest"); // Error: sayHi is not a function
    }
};

welcome = sayHi;
sayHi = null;

// welcome(); // // Error, the nested sayHi call doesn't work any more!


/*
    That happens because the function takes sayHi from its outer lexical environment. 
    There’s no local sayHi, so the outer variable is used. And at the moment of the call 
    that outer sayHi is null.

    The optional name which we can put into the Function Expression is meant to solve 
    exactly these kinds of problems.

    Let’s use it to fix our code:
*/

sayHi = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Guest"); // Now all fine
    }
};

sayHi(); // Hello, Guest (nested call works)


/*
    Now it works, because the name "func" is function-local. It is not taken from 
    outside (and not visible there). The specification guarantees that it will always 
    reference the current function.
*/

