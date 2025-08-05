//------------------> Code blocks

{
    // do some job with local variables that should not be seen outside

    let message = "Hello"; // only visible in this block
    console.log(message); // Hello
}
// console.log(message); // Error : message is not defined



// We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

{
    // show message
    let message = "Hello";
    console.log(message);
}

{
    // show another message
    let message = "Goodbye";
    console.log(message);
}

/*
    There’d be an error without blocks :
        Please note, without separate blocks there would be an error, if we use let 
        with the existing variable name:


    // show message
    let message = "Hello";
    console.log(message);

    // show another message
    let message = "Goodbye"; // Error: variable already declared
    console.log(message);

*/


// For if, for, while and so on, variables declared in {...} are also only visible inside:

if (true) {
    let phrase = "Hello world !!";
    console.log(phrase);
}
// console.log(phrase); // Error : phrase is not defined




// The similar thing holds true for for and while loops:

for (let i = 0; i < 3; i++) {
    console.log(i) // variable i is only visible inside this for
}
// console.log(i) // Error: i is not defined
console.log("\n");









//----------------> Nested functions : A function is called “nested” when it is created inside another function.


function sayHiBye(firstName, lastName) {

    // helper nested function to use below
    function getFullName() {
        return firstName + " " + lastName;
    }

    console.log("Hello, " + getFullName());
    console.log("Bye, " + getFullName());
}

sayHiBye("pranav", "singh");


/*
    🔁 The Original Statement:

        A nested function can be returned: either as a property of a new object or as a result 
        by itself. It can then be used somewhere else. No matter where, it still has access to 
        the same outer variables.



    🧩 Step-by-step Explanation:

    1. Nested function
        - A function that is written inside another function.

    2. Can be returned
        - You can return that inner function from the outer one (instead of just calling it inside).

    3. As a property of an object or by itself
        - You can either: 
        - Put the inner function inside an object, and return that object. 
        - Or just return the function itself.


        Case 1: Return Function By Itself -> This is like handing someone a hammer directly.

            function outer() {
                let name = "Pranav";

                // This is the tool (function)
                function greet() {
                    console.log("Hello, " + name);
                }

                return greet; // return the function itself
            }

            let sayHi = outer(); // now we have greet() stored in sayHi
            sayHi(); // Hello, Pranav

            Summary : outer() returned the greet function directly. We stored it in sayHi and called it.




        Case 2: Return Function Inside an Object -> This is like putting the hammer inside a toolbox and handing the toolbox.

            function outer() {
                let name = "Pranav";

                function greet() {
                    console.log("Hi, " + name);
                }

                return {
                    greetMethod: greet  // returning an object with a method
                };
            }

            let obj = outer();      // obj = { greetMethod: greet }
            obj.greetMethod();      // Hi, Pranav


            Summary : Instead of returning greet directly, we returned an object that contains greet as a property.


        Why do this?
            - If you return just the function → simple and short.
            - If you return an object → you can add more functions or values later, like a toolbox.


    4. Used somewhere else
        - Even if you use that function later, maybe in another place of your code...

        Example: Used Somewhere Else

            function outer() {
                let secret = "Top Secret";

                function revealSecret() {
                    console.log("The secret is:", secret);
                }

                return revealSecret;
            }

            // Store the function somewhere
            let spy = outer();

            // Move it to another part of your program
            function runLater(fn) {
                console.log("Running the spy function later...");
                fn(); // It still remembers the secret!
            }

            runLater(spy); // Output: The secret is: Top Secret




    5. Still has access to the same outer variables
        - It will remember the variables from where it was created. it means When a function is 
        created inside another function, it remembers the variables of that outer function, 
        even after the outer function is done running.

        - This is what’s called a closure.


        function outer() {
            let message = "I am from outer";

            function inner() {
                console.log(message); // inner can still access outer's variable
            }

            return inner;
        }

        let result = outer(); // outer runs and returns inner
        result(); // Output: I am from outer


    Step-by-step:
        1. outer() runs.
        2. It creates message = "I am from outer" and defines inner().
        3. It returns inner() and we store it in result.
        4. Now outer() is done — normally its variables would be gone.
        5. But when we call result() (which is the inner function), it still remembers message.


    This memory is a closure!
        - inner() closes over the variable message.
        - That’s why it’s called a closure — it keeps a reference to its surrounding data.

*/



// Below, makeCounter creates the “counter” function that returns the next number on each invocation:

function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();
console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2
console.log( counter() ); // 3
console.log("\n");







//-------------------> Closures


//functions can return functions

function outerFun() {
    function innerFun() {
        console.log("Function returned by function");
    }
    return innerFun;
}
let result = outerFun();
console.log(result);
result();


function printFullName(firstName, lastName) {
    function printName() {
        console.log(firstName, lastName);
    }
    return printName;
}
result = printFullName("Pranav", "Chandel");
result();
console.log("\n");








//------------------> Tasks


/*
    Does a function pickup latest changes?

    The function sayHi uses an external variable name. When the function runs, 
    which value is it going to use?
*/
let name = "Pranav";
function sayHi() {
    console.log("Hi, "+ name);
}
name = "Atul";
sayHi(); // Hi, Atul




/*
    Which variables are available?

    The function makeWorker below makes another function and returns it. 
    That new function can be called from somewhere else.

    Will it have access to the outer variables from its creation place, 
    or the invocation place, or both?
*/

function makeWorker() {
    let fname = "Pete";

    return function() {
        console.log(fname);
    };
}

let fname = "John";

let work = makeWorker();

work();






/*
    Are counters independent?

    Here we make two counters: counter and counter2 using the same makeCounter function.
    Are they independent? What is the second counter going to show? 0,1 or 2,3 or something else?
*/

function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

counter = makeCounter();
let counter2 = makeCounter();

console.log(counter());
console.log(counter());

console.log(counter2());
console.log(counter2());






/*
Counter object

Here a counter object is made with the help of the constructor function.
Will it work? What will it show?
*/

function Counter() {
    let count = 0;
    
    this.up = function() {
        return ++count
    };
    this.down = function() {
        return --count;
    };
}

counter = new Counter();

console.log(counter);
console.log(counter.up());
console.log(counter.up());
console.log(counter.down());








/*
    Function in if

    Look at the code. What will be the result of the call at the last line?
*/

let phrase = "Hello";

if (true) {
    let user = "John";

    function sayHi() {
        console.log(`${phrase}, ${user}`);
    }
}

sayHi();
















