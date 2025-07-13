// ➡️ Function statements or declaration

a();
function a() {
    console.log("a called");
}
a();

// ➡️ Function expression

// b(); //---> Error
let b = function () {
    console.log("b called");
};
b();

// Anonymous function

// ➡️ Named function expression

let c = function xyz() {
    console.log("c called");
};
c();
// xyz(); //---> Error

// ➡️ Difference between paramater and arguements

function d(param1, param2) {
    console.log(param1, param2);
}
let arg1 = 2;
let arg2 = 4;
d(arg1, arg2);









// ➡️ First class function or citizen : passing and returning function to and from another function

//passing function to another fn
function e(param1, param2) {
    console.log(param1);
    console.log(param2);
}
e(
    function () {
        console.log("param1 as arg1");
    },
    function () {
        console.log("param2 as arg2");
    }
);


//returning function from fn
function f(){
    return function(){
        console.log("function returned from f()");
    }
}

console.log(f());








// ➡️ Arrow functions
let g = (param1) => console.log(`printing ${param1} using arrow fn`);
g(1234);