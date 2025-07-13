/*
    The regular {...} syntax allows us to create one object. 
    But often we need to create many similar objects, like multiple users or menu items and so on.
    That can be done using constructor functions and the "new" operator.
*/





//----------> Constructor function : regular fn named with capital letter first & executed only with "new" operator

function User( name ) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");
console.log( user );
console.log("\n");


/*
    When a function is executed with new, it does the following steps:
        1. A new empty object is created and assigned to this.
        2. The function body executes. Usually it modifies this, adds new properties to it.
        3. The value of this is returned.

    Check Obsidian notes for more detail
*/









//----------> If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

let student = new function() {
    this.name = "Pranav";
    this.age = 20;
};

console.log( student );
console.log("\n");

/*
    This constructor can’t be called again, 
    because it is not saved anywhere, just created and called. 
    So this trick aims to encapsulate the code that constructs the single object, 
    without future reuse.
*/









//---------> Return from constructors

/*
    Usually, constructors do not have a return statement. 
    Their task is to write all necessary stuff into "this", and it automatically becomes the result.
    
    But if there is a return statement, then the rule is simple:    
        1. If return is called with an object, then the object is returned instead of this.
        2. If return is called with a primitive, it’s ignored.
    
    In other words, return with an object returns that object, 
    in all other cases this is returned.
*/

function BigUser() {
    this.name = "John";
    return { name : "Alice" };
}
console.log(new BigUser().name); // ALice


function SmallUser() {
    this.name = "John";
    return "Bob";
}
console.log(new SmallUser().name); // John
console.log("\n");


/*
    Usually constructors don’t have a return statement. 
    Here we mention the special behavior with returning objects, 
    mainly for the sake of completeness.
*/










//---------> Methods in constructor

/*
    Using constructor functions to create objects gives a great deal of flexibility. 
    The constructor function may have parameters that define how to construct the object, 
    and what to put in it.

    Of course, we can add to this not only properties, but methods as well.

    For instance, new Admin(name) below creates an object with the given name and the method sayHi:
*/


function Admin(name) {
    this.name = name;
    this.sayHi = function() {
        console.log( "Hey, I am " + this.name );
    };
}

let vageesh = new Admin( "Vageesh" );
console.log( vageesh );
vageesh.sayHi();
console.log("\n");

/*
    john = {
        name: "John",
        sayHi: function() { ... }
    }
*/




// <---------------------PROBLEM TASKS-------------------->




// 1. Is it possible to create functions A and B so that new A() == new B() ?? -----> Yes

function A() { }
function B() { }

let a = new A();
let b = new B();

console.log( a == b );  // False

/*
    Yes, it’s possible.
    If a function returns an object then new returns it instead of this.
    So they can, for instance, return the same externally defined object obj:
*/

let object = {};

function X() { return object }
function Y() { return object }

console.log( new X() == new Y() ); // true










