//---------------> Optional chaining '?.' 

/*
    The optional chaining ?. is a safe way to access nested object properties, 
    even if an intermediate property doesn’t exist.
*/

let user = {
    name : {
        firstName : "Pranav",
        middleName : "Singh",
        lastName : "Chandel"
    }
};

console.log( user.name.firstName );
// console.log( user.address );      // Undefined
// console.log( user.address.city ); // Error 



/*
    That’s the expected result. JavaScript works like this. 
    As user.address is undefined, an attempt to get user.address.street fails with an error.

    🔍 What’s Happening:
        🔹 1. user.addresss
            JavaScript looks for a property named address in the user object.

            It doesn't exist, so:
            👉 user.address === undefined ✅

        🔹 2. user.address.city
            This tries to go one level deeper:
            👉 It first evaluates user.address → which is undefined.

            Then it tries to access .city on undefined, which is not allowed, so:
            ❌ Error: Cannot read properties of undefined (reading 'city')

    💡 Real-life Analogy:
        Think of this like trying to open a box inside a drawer:

            ✅ drawer.box: Box is not there → you just see "box is missing" (undefined)
            ❌ drawer.box.content: You’re trying to open the content of a box that doesn’t exist → 💥 crash (error)


    In many practical cases we’d prefer to get undefined instead of an error here (meaning “no street”).

    How can we do this?
    The obvious solution would be to check the value using if or 
    the conditional operator ?, before accessing its property, like this:
*/

console.log( user.address ? user.address.city : undefined ); //no error


/*
    It works, there’s no error… But it’s quite inelegant. 
    As you can see, the "user.address" appears twice in the code.

    For more deeply nested properties, it becomes even uglier, 
    as more repetitions are required.

    👉 E.g. let’s get user.address.street.name in a similar fashion.

*/

console.log( user.address ? user.address.street ? user.address.street.name : null : null );


/* ----> For understandinng nested ternary operator

console.log(null ? 0 ? false : "pranav" : "ayush" );  // condition1 ? (condition2 ? truePart : falsePart) : falsePart


if (null) {
    if (0) {
        console.log(false);
        } else {
            console.log("Pranav");
    }
    } else {
        console.log("Ayush");
}

*/








//-------> its awful, There’s a little better way to write it, using the && operator:

console.log( user.address && user.address.street && user.address.street.name ); //undefined (no error)

/*
    AND’ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn’t ideal.
    As you can see, property names are still duplicated in the code. E.g. in the code above, user.address appears three times.
    That’s why the optional chaining ?. was added to the language. To solve this problem once and for all!
*/











//-----------> Optional chaining

/*
    The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

    Further in this article, for brevity, we’ll be saying that something “exists” if it’s not null and not undefined.

    In other words, value?.prop :
        - works as value.prop, if value exists,
        - otherwise (when value is undefined/null) it returns undefined.
    
    Here’s the safe way to access user.address.street using ?.
    The code is short and clean, there’s no duplication at all.
*/


console.log( user ?. address ?. street ); //undefined (no error)



// Reading the address with user?.address works even if user object doesn’t exist:

user = null;
console.log( user ?. address );
console.log( user ?. address.street ); // it will give error if user is not null



/*
    ⚠️ Don't Overuse Optional Chaining (?.)

        We should use ?. only where it’s ok that something doesn’t exist.

        For example, if according to our code logic user object must exist, 
        but address is optional, then we should write (user.address ?. street) , 
        but not (user ?. address ?. street)

        Then, if user happens to be undefined, we’ll see a programming error about it and fix it.
        Otherwise, if we overuse ?., coding errors can be silenced where not appropriate,
        and become more difficult to debug.



    ⚠️ The variable before ?. must be declared
        If there’s no variable user at all, then (user ?. anything) triggers an error:

        user?.address; ---> ReferenceError: user is not defined

        The variable must be declared (e.g. let/const/var user or as a function parameter). 
        The optional chaining works only for declared variables.
*/










//---------> Short circuiting

/*
    As it was said before, the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.
    So, if there are any further function calls or operations to the right of ?., they won’t be made.
*/


let admin = null;
let x = 0;

admin ?. sayHi( x++ ); // No admin, so the execution doesn't reach sayHi call and x++
console.log( x ); // 0












//--------> Other variants: ?.(), ?.[]

/*
    The optional chaining ?. is not an operator, but a special syntax construct, that also works with functions and square brackets.
    For example, ?.() is used to call a function that may not exist.
    In the code below, some of our users have admin method, and some don’t:
*/

let userAdmin = {
    admin() {
        console.log( "I am admin" );
    }
};

let userGuest = {};

userAdmin.admin();
userAdmin.admin ?.();

// userGuest.admin();  // Error becuase there is no admin method is userGuest
userGuest.admin ?.(); // returns undefined, no error, no output

/*
    obj.method()	--> Calls method if it exists, else throws error ❌
    obj.method?.()	--> Calls method if it exists, else return undefined ✅, If you want to see something printed, you need to explicitly log it

*/

console.log( userGuest.admin ?.() ); // undefined






/*
    The ?.[] syntax also works, 
    if we’d like to use brackets [] to access properties instead of dot ( . )
    Similar to previous cases, it allows to safely read a property from an object that may not exist.
*/



let key = "firstName";

let user1 = {
    firstName : "Pranav singh"
};

let user2 = null;

console.log( user1[key] );
console.log( user1 ?. [key] );
console.log( user1 ?. ["lastName"] );


// console.log( user2[key] ); // error, key does not exist in user2
console.log( user2 ?. [key] );


/*
    obj[key] --> Accesses the property else Throws an error if obj is null or undefined ❌
    obj?.[key]  --> Safely accesses the property else Returns undefined if obj is null or undefined ✅
*/












//-----------> Also we can use ?. with delete:


delete user?.name; //delete user.name if user exists





/*
    ⚠️ We can use ?. for safe reading and deleting, but not writing
        The optional chaining ?. has no use on the left side of an assignment.

        For example:

        let user = null;
        user?.name = "John"; 
        
        // Error, doesn't work
        // because it evaluates to: undefined = "John"
*/









/*
    ✅ Summary: Optional Chaining (?.)

        The optional chaining ?. syntax has 3 main forms:

            1. obj?.prop  → Returns obj.prop if obj exists, else returns undefined.

            2. obj?.[prop]  → Returns obj[prop] if obj exists, else returns undefined.

            3. obj.method?.()  → Calls obj.method() if obj.method exists, else returns undefined.
*/
