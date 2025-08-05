/*
    There’s one more way to create a function. It’s rarely used, 
    but sometimes there’s no alternative.

    Syntax : let func = new Function ([arg1, arg2, ...argN], functionBody);
*/


// Here’s a function with two arguments:
let sum = new Function('a', 'b', 'return a + b');
console.log( sum(1, 2) ); // 3


// And here there’s a function without arguments, with only the function body:
let sayHi = new Function('console.log("Hello")');
sayHi(); // Hello
console.log("\n");


/*
    The major difference from other ways we’ve seen is that the function is created 
    literally from a string, that is passed at run time.

    All previous declarations required us, programmers, to write the function 
    code in the script.

    But new Function allows to turn any string into a function. For example, we can 
    receive a new function from a server and then execute it:
*/




//----------------> Closure


/*
    🔁 Normal Function = Closure

    ✅ Regular functions (declared or function expressions):
        - They remember the environment in which they were created.


        function outer() {
            let message = "Hello";

            function inner() {
                console.log(message); // ✅ "Hello" — has access to outer variable
            }

            return inner;
        }

        let fn = outer();
        fn(); // Prints: Hello


        Here, inner() is a closure, because it "remembers" the variable message from outer()'s environment.





    🚫 new Function() — No Closure

        function outer() {
            let message = "Hello";

            let func = new Function('console.log(message)');
            return func;
        }

        let fn = outer();
        fn(); // ❌ ReferenceError: message is not defined


        Even though message is in the outer function, the dynamically created function doesn't remember it.




    ❗ Why?
        Because:
            - A function created with new Function(code) has its [[Environment]] set to the 
              global lexical environment, not the one where it was created.
            - So it cannot access outer/local variables, only global ones.



    ✅ But It Can Access Global Variables

        let globalMessage = "I'm global";

        let func = new Function('console.log(globalMessage)');
        func(); // ✅ Works — prints: I'm global


    🧠 Summary

        | Function Type    | Has Access to Outer Variables?  |   [[Environment]] |
        | ---------------- | ------------------------------  | ----------------- |
        | Regular function | ✅ Yes                          | Current context   |
        | Arrow function   | ✅ Yes                          | Current context   |
        | new Function()   | ❌ No                           | Always global     |


    📦 When to Use new Function
        Only when:
            - You need to evaluate code dynamically.
            - You don't need access to the current scope.
            - You’re building tools like:
            - Code playgrounds
            - JSON-to-function parsers
            - Dynamic calculators from strings

    ⚠️ But never use it with user input unless you're sanitizing it — it can be a huge security risk.

*/


function getFunc() {
    let value = "test";
    let func = new Function("console.log(value)");
    return func;
}
// getFunc()(); // error: value is not defined


let globalValue = "test";
function getFunc() {
    let func = new Function("console.log(globalValue)");
    return func;
}
// getFunc()(); // error: globalValue is not defined

/*
    In JavaScript, functions created with the new Function constructor:
    do not close over the surrounding (lexical) environment. Instead, they are 
    created in the global scope.

    globalValue is not defined in the global scope, only in the outer scope of getFunc.
*/



globalThis.globalValue = "test";
function getFunc() {
    let func = new Function("console.log(globalValue)");
    return func;
}
getFunc()(); // test




function outer() {
    function inner() {
        console.log("Hello");
    }
    return inner;
}
outer()();



