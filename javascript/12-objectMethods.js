//---------> Object represents real worls entities

let user = {
    name : "Pranav",
    age : 30
};
console.log(user);
console.log("\n");







//---------> Real world entity can perform actions, in JS actions are represented by functions

user = {
    name : "Pranav",
    age : 30
};
console.log(user);


user.sayHi = function() {
    console.log( "Hiiiii !!" );
}
user.sayHi(); // A function that is a property of an object is called its method.


//  we can use a pre-declared function as a method, like this
function run() {
    console.log( "Running !!" );
}
user.run = run;

user.run();
console.log("\n");










//---------> Method shorthand

user = {
    sayHi : function() {
        console.log( "Hiii" );
    }
};

user = {
    sayHi() {
        console.log( "Hiii" );
    }
};


