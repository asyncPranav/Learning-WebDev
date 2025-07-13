// --------->primitives are copied by value 

let message = "Hello";
let phrase = message;
console.log(message);
console.log(phrase);



// --------->objects are copied by reference

let user = {
    name : "Pranav",
    age : 100,
};
let admin = user;
console.log(user);
console.log(admin);
console.log( user === admin ); // true : both obj are pointing to same obj only having different references


// --------->if we change one variable then another variable will be unafected

message = "Hyyyy";
console.log(message);
console.log(phrase);


// --------->if we change one variable then another variable will also get changed

admin.name = "Atul";
console.log(admin);
console.log(user);


// ---------> comparison by reference

let a = {};
let b = a;
console.log(a == b); // equal  only when both are referencing to same object
console.log(a === b);

let c = {};
let d = {};
console.log(c == d); // unequal because c and d are two different object
console.log(c === d);
console.log("\n");


// ---------> const object's properties can be modified 

const userr = {
    name : "Pranav",
    age : 47,
};
console.log(userr);

userr.name = "Atul";
console.log(userr);

// ---------> But const object varibale can't be reassigned and can't hold another objects reference

// userr = {                  //error
//     name : "Ayush",
//     age : 12,
// };

// admin = {
//     name : "Ayush",
//     age : 12,
// };

// userr = admin;          //error
console.log("\n");



// ---------> CLoning and Merging, Object.assign

user = {
    name : "Pranav",
    age : 77,
};

let clone = {};

for(let key in user){
    clone[key] = user[key];
}

console.log(user);
console.log(clone);


// --------> If we modify clone object it will not affect original 

clone.name = "Atul";
console.log(clone);
console.log(user);
console.log("\n");




// ----------> we can use method : Object.assign( dest, .....sources ) -> Shallow copy

user = { name : "Pranav" };
let permission1 = { canView : true };
let permission2 = { canEdit : false };

console.log(user);

Object.assign( user, permission1, permission2 );
console.log(user);


// lets shallow copy user obj to empty clone obj
clone = {};
console.log(clone);

Object.assign( clone, user );
console.log(clone);


// In shallow copy original & cloned obj are two distinct obj, hence modification of one obj will not affect another
clone.name = "Vageesh";
console.log(clone);
console.log(user);




// If the copied property name already exists, it gets overwritten:
console.log();
admin = {
    name : "Atul"
};
console.log(admin);

Object.assign( admin, user );
console.log(admin);



let original = {
    name : "Chachcha",
    age : 102,
};
console.log( original );

clone = Object.assign( {}, original );
console.log( clone );

console.log( original === clone ); //false
console.log("\n");






//---------> Nested object : property of an object can be referenced to other object

let shape = {
    name : "Rectangle",
    size : {
        length : 200,
        width : 100
    }
};

console.log( shape );
console.log( shape.size );
console.log( shape.size.length );
console.log("\n");







//-------------> Clone nested object

shape = {
    name : "Rectangle",
    size : {
        length : 200,
        width : 100
    }
};

clone = Object.assign( {}, shape );

console.log( clone );

console.log( shape === clone ); // false


// true :  it’s not enough to copy "clone.size = shape.size", because "shape.size" is an object, and will be copied by reference, so clone and shape  will share the same sizes
console.log( shape.size === clone.size ); // true

//proof : we will change length property of shape.size and it will also affect clone.size
shape.size.length = 20;
console.log( shape );
console.log( clone );
console.log("\n");






//--------------> Structured cloning (Deep clonong) : fixing of above problem (make "shape" and "clone" truly separate objects)

shape = {
    name : "Rectangle",
    size : {
        length : 200,
        width : 100
    }
};

clone = structuredClone( shape );

console.log( clone );

console.log( shape === clone );
console.log( shape.size === clone.size );
console.log("\n");







//---------> Circular references : If an object contains a reference to itself (directly or through other objects), it’s called a circular reference.


user = {
    name : "Pranav"
};

console.log( user );

user.friend = user;
console.log( user );
console.log("\n");







//----------> structuredClone() also support circular reference : "clone.me" references the "clone" , not the "user" !

user = {};
user.me = user;
console.log( user );

clone = structuredClone( user );
console.log( clone.me === clone ); // true
console.log( clone.me === user ); // false
console.log("\n");









//----------> Object with methods/function

let person = {
    run : function() {
        return "Running......";
    }
};
console.log( person );
console.log( person.run );
console.log( person.run() );
console.log();



person = {
    name : "Pranav",
    run : function() { return "Running...." },
    eat : function() { return "Eating...." }
};
console.log( person );
console.log( person.run() );
console.log( person.eat() );
console.log("\n");









//----------> Modern syntax of doing same 

person = {
    run() {
        return "Running......";
    }
};
console.log( person );
console.log( person.run );
console.log( person.run() );
console.log();



person = {
    name : "Pranav",
    run() { return "Running...." },
    eat() { return "Eating...." }
};
console.log( person );
console.log( person.run() );
console.log( person.eat() );
console.log("\n");











//--------------> structuredClone() does not support functional properties of object

person = {
    name : "Pranav",
    run() { return "Running...." },
    eat() { return "Eating...." }
};

// clone = structuredClone( person ); // error : run() { return "Running...." } could not be cloned.
console.log("\n");









// Unable to understand it - Look in to it later (circular reference related stuff)
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
      father: man,
      mother: woman
    }
}

let family = marry( { name: "John" }, { name: "Ann" } );

console.log( family );
