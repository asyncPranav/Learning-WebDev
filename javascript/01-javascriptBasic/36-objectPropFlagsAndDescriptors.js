//----------------------> Property flags and descriptors


/*
    As we know, objects can store properties.

    Until now, a property was a simple “key-value” pair to us. But an object 
    property is actually a more flexible and powerful thing.

    In this chapter we’ll study additional configuration options, and in the next 
    we’ll see how to invisibly turn them into getter/setter functions.

*/





//-----------------> Property flags

/*
    Object properties, besides a value, have three special attributes (so-called “flags”):

        writable – if true, the value can be changed, otherwise it’s read-only.
        enumerable – if true, then listed in loops, otherwise not listed.
        configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.


        1️⃣ writable:
            - Can the value be changed later using assignment?
            - true  ✅ = yes, value can be changed
            - false ❌ = value is read-only


        2️⃣ enumerable:
            - Will the property show in loops like for...in or Object.keys() or Object.entries() or console.log(obj) ?
            - true  ✅ = The property is visible
            - false ❌ = The property is hidden from all the above

            ⚠️ If enumerable is false:
                - It will NOT show up in loops or console.log(obj)
                - It still exists — you can access it directly via obj.prop
                - Can see using console.log(obj.prop) or console.log(descriptor)


        3️⃣ configurable:
            - Can the property be deleted or redefined using defineProperty again?
            - true  ✅ = You can delete the property, or change its descriptor (flags)
            - false ❌ = locked; can’t delete or change flags (like writable or enumerable)




    We didn’t see them yet, because generally they do not show up. When we create a 
    property “the usual way”, all of them are true. But we also can change them anytime.

    First, let’s see how to get those flags.

    The method Object.getOwnPropertyDescriptor allows to query the full 
    information about a property.

    The syntax is:

        let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

            obj : The object to get information from.
            propertyName : The name of the property.


    The returned value is a so-called “property descriptor” object: it contains 
    the value and all the flags.

*/

let user = {
    name : "Pranav",
    age : 12
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
console.log(JSON.stringify(descriptor, null, 2));
console.log("\n");



/*
    To change the flags, we can use Object.defineProperty.

    The syntax is:
        Object.defineProperty(obj, propertyName, descriptor)

            obj, propertyName : The object and its property to apply the descriptor.
            descriptor : Property descriptor object to apply.

        
        Object.defineProperty(obj, "propertyName", {
            value: ...,              // the value to store
            writable: true,          // can it be changed?
            enumerable: true,        // will it show in loops?
            configurable: true       // can it be deleted/changed?
        });


    If the property exists, defineProperty updates its flags. Otherwise, it creates 
    the property with the given value and flags; in that case, if a flag is 
    not supplied, it is assumed false.

    Meaning:
        - If the property already exists → it updates the rules (flags).
        - If it doesn't exist → it creates a new one, with the rules you set.
        - If you don’t mention a rule, it becomes false by default.

    For instance, here a property name is created with all falsy flags:

*/

user = {};

Object.defineProperty(user, "name", {
    value : "Pranav"
});

descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
console.log();

/*
    Compare it with “normally created” user.name above: now all flags are falsy. 
    If that’s not what we want then we’d better set them to true in descriptor.
*/


//if we want to add multiple properties

user = {};

Object.defineProperty(user, "name", {
    value : "Pranav"
});

Object.defineProperty(user, "age", {
    value : 12
});

descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(user, "age");
console.log(descriptor);
console.log();





//if we want to add multiple properties at once

user = {};

Object.defineProperties(user, {
    name : {
        value : "Pranav singh"
    },
    age : {
        value : 2
    },
    isAdmin : {
        value : true
    }
});


descriptor = Object.getOwnPropertyDescriptors(user)
console.log(descriptor);
console.log("\n");




//-----------------> Non-writable


// Let’s make user.name non-writable (can’t be reassigned) by changing writable flag:
user = {
    name : "Pranav"
};

Object.defineProperty(user, "name", {
    writable : false
});

console.log(user.name);

user.name = "John"; // nothing happens here 
console.log(user.name);

/*
    In non-strict mode, the assignment to a non-writable property does nothing silently. 
    In strict mode, you’ll get a TypeError.
    
    Now no one can change the name of our user, unless they apply their own 
    defineProperty to override ours.
*/
console.log();



// Here’s the same example, but the property is created from scratch:
user = {};

Object.defineProperty(user, "name", {
    value : "Pranav singh",
    // for new properties we need to explicitly list what's true
    enumerable: true,
    configurable: true
});

console.log(user.name);

user.name = "John"; // nothing happens here 
console.log(user.name);
console.log("\n");







//------------------> Non-enumerable


/*
    Now let’s add a custom toString to user.

    Normally, a built-in toString for objects is non-enumerable, it does not show 
    up in for..in. But if we add a toString of our own, then by default it 
    shows up in for..in, like this:
*/

user = {
    name : "Pranav chandel",
    toString() {
        return this.name;
    }
};
// By default, both our properties are listed:
for (let key in user) {
    console.log(key); // name, toString
}
console.log();

/*
    If we don’t like it, then we can set enumerable:false. Then it won’t 
    appear in a for..in loop, just like the built-in one:
*/



user = {
    name : "Pranav chandel",
    toString() {
        return this.name;
    }
};

Object.defineProperty(user, "toString", {
    enumerable : false
});

// Now our toString disappears:
for (let key in user) console.log(key); // name

// Non-enumerable properties are also excluded from Object.keys:
console.log(Object.keys(user)); // [ 'name' ]
console.log("\n");









//---------------------> Non-configurable


/*
    The non-configurable flag (configurable:false) is sometimes preset 
    for built-in objects and properties.

    A non-configurable property can’t be deleted, its attributes can’t be modified.

    For instance, Math.PI is non-writable, non-enumerable and non-configurable:
*/

descriptor = Object.getOwnPropertyDescriptor(Math, "PI");
console.log(descriptor);
console.log();

// So, a programmer is unable to change the value of Math.PI or overwrite it.

Math.PI = 3; // nothing happens here

/*
    In non-strict mode, the assignment to a non-writable property does nothing silently. 
    In strict mode, you’ll get a TypeError.
    
    Now no one can change the name of our user, unless they apply their own 
    defineProperty to override ours.
*/


// We also can’t change Math.PI to be writable again, Error: Cannot redefine property: PI
// Object.defineProperty(Math, "PI", {
//     writable : true
// });

/*
    There’s absolutely nothing we can do with Math.PI.

    Making a property non-configurable is a one-way road. We cannot change it back 
    with defineProperty.

    Please note: configurable: false prevents changes of property flags and its 
    deletion, while allowing to change its value.

    Here user.name is non-configurable, but we can still change it (as it’s writable):
*/


user = {
    name : "Pranav"
};

Object.defineProperty(user, "name", {
    configurable : false
});

console.log(user.name);

user.name = "Atul"; // works fine
console.log(user.name);

delete user.name; // nothing happens here, but in strict mode it will give error
console.log(user.name);
console.log();



// And here we make user.name a “forever sealed” constant, just like the built-in Math.PI:
user = {
    name : "Pranav singh"
};

Object.defineProperty(user, "name", {
    writable : false,
    configurable : false
});

console.log(user.name);

// won't be able to change user.name or its flags\\ all this won't work:
// all this won't work:
user.name = "Atul Chandel"; // nothing happens here, but in strict mode it will give error
console.log(user.name);

delete user.name; // nothing happens here, but in strict mode it will give error
console.log(user.name);

// Error: Cannot redefine property: name
// Object.defineProperty(user, "name", {
//     value : "Atul chandel"
// });
// console.log(user.name);


/*
    The only attribute change possible: writable true → false

    There’s a minor exception about changing flags.

    We can change writable: true to false for a non-configurable property, 
    thus preventing its value modification (to add another layer of protection). 
    Not the other way around though.
*/
console.log("\n");







//---------------> Object.defineProperties


/*
    There’s a method Object.defineProperties(obj, descriptors) that allows to 
    define many properties at once.

    The syntax is:

        Object.defineProperties(obj, {
            prop1: descriptor1,
            prop2: descriptor2
            // ...
        });

*/


user = {};

Object.defineProperties(user, {
    name : {
        value : "Pranav",
        writable : false
    },
    age : {
        value : 12,
        writable : false,
        configurable : false
    }
});

console.log(user); // Empty {}

/*
    😮 Why?

        Because both properties are non-enumerable by default, so they won’t show in:
            1. console.log(user)
            2. Object.keys(user)
            3. for...in loop

    ✅ But they DO exist!

        Try this:

            console.log(user.name); // Pranav
            console.log(user.age);  // 12


        Or check descriptors:

            console.log(Object.getOwnPropertyDescriptors(user));

        🖨️ Output:

            {
                name: {
                    value: 'Pranav',
                    writable: false,
                    enumerable: false,
                    configurable: false
                },
                age: {
                    value: 12,
                    writable: false,
                    enumerable: false,
                    configurable: false
                }
            }

*/




// make properties visible in console
user = {};

Object.defineProperties(user, {
    name : {
        value : "Pranav",
        writable : false,
        enumerable : true
    },
    age : {
        value : 12,
        writable : false,
        configurable : false,
        enumerable : true
    }
});

console.log(user); // { name: 'Pranav', age: 12 }
console.log("\n");









//----------------> Object.getOwnPropertyDescriptors(obj)


/*
    ✅ What it does:

        This method returns all the detailed settings (descriptors) for each 
        property in an object.

        The returned info includes:
            value — the data stored
            writable — can it be changed?
            enumerable — will it appear in loops or console?
            configurable — can it be deleted or modified?

        It gives more detail than just Object.keys() or console.log().



    📦 Syntax: 
    
        Object.getOwnPropertyDescriptors(object)



    Together with Object.defineProperties it can be used as a “flags-aware” way 
    of cloning an object:

        let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
        
    Normally when we clone an object, we use an assignment to copy properties, like this:

        for (let key in user) {
            clone[key] = user[key]
        }

    But that does not copy flags. So if we want a “better” clone then 
    Object.defineProperties is preferred.

    Another difference is that for..in ignores symbolic and non-enumerable properties, 
    but Object.getOwnPropertyDescriptors returns all property descriptors including 
    symbolic and non-enumerable ones.

    🔍 Real Use Case

        Suppose you want to:
            - Copy an object exactly, including flags (not just values)
            - Clone a class or built-in object
            - Debug why a property can’t be changed, deleted, or seen
*/



user = {};

Object.defineProperty(user, "name", {
  value: "Pranav",
  writable: false,
  enumerable: true,
  configurable: true
});

Object.defineProperty(user, "age", {
  value: 22,
  writable: true,
  enumerable: true,
  configurable: false
});

console.log(Object.getOwnPropertyDescriptors(user));
console.log();


// Copy an object exactly, including flags (not just values)
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
console.log(Object.getOwnPropertyDescriptors(user));
console.log(Object.getOwnPropertyDescriptors(clone));


/*
    ✅ Why is this better than shallow copying?

        If you did this:

            const shallowCopy = { ...user };

        It would copy only the values — not the flags.
            - writable, enumerable, and configurable would all reset to true.
            - You lose control and behavior settings.

*/


/*
    🧠 Why Object.getOwnPropertyDescriptors is Better for Cloning


        🟡 1. ✅ for...in loop copies only values — not property flags

            const user = {};
            Object.defineProperty(user, "name", {
                value: "Pranav",
                writable: false,
                enumerable: false,
                configurable: false
            });

            // Clone using for...in loop
            const clone1 = {};
            for (let key in user) {
                clone1[key] = user[key];
            }

            console.log(clone1); // {} → name was non-enumerable, not copied


            ⚠️ Problem:
                - for...in ignores non-enumerable properties.
                - It only copies values, not writable, configurable, or enumerable flags.
                - Resulting object does not behave like the original.




        🟢 2. ✅ Object.getOwnPropertyDescriptors copies everything

            const clone2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
            console.log(Object.getOwnPropertyDescriptor(clone2, "name"));
            
            💡 Output :

                {
                    value: 'Pranav',
                    writable: false,
                    enumerable: false,
                    configurable: false
                }

            📌 It copied the full behavior (flags) of the property.



        🟡 3. for...in ignores symbolic keys too

            const sym = Symbol("id");

            const user = {
                age: 25,
                [sym]: 123
            };

            Object.defineProperty(user, "hidden", {
                value: true,
                enumerable: false
            });

            for (let key in user) {
                console.log(key); // Only "age"
            }

            console.log(Object.getOwnPropertyDescriptors(user));


            💡 Output :

                - age (normal property)
                - hidden (non-enumerable)
                - [Symbol(id)] (symbolic key)


        🧾 Summary Table

            | Method                               | Copies Non-Enumerable?  | Copies Symbols?  | Copies Flags? (`writable`, etc.) |
            | ------------------------------------ | ----------------------  | ---------------  | -------------------------------- |
            | for...in                             | ❌ No                   | ❌ No            | ❌ No                            |
            | Object.assign()                      | ❌ No                   | ❌ No            | ❌ No                            |
            | Object.getOwnPropertyNames           | ✅ Yes                  | ❌ No            | ❌ No (just names)               |
            | Object.getOwnPropertySymbols         | ❌ No                   | ✅ Yes           | ❌ No                            |
            | Object.getOwnPropertyDescriptors     | ✅ Yes                  | ✅ Yes           | ✅ Yes                           |


*/









//------------> Sealing an object globally


/*

    Property descriptors work at the level of individual properties.

    There are also methods that limit access to the whole object:

        1. Object.preventExtensions(obj)
            Forbids the addition of new properties to the object.


        2. Object.seal(obj)
            Forbids adding/removing of properties. Sets configurable: false for all existing properties.
        
        
        3. Object.freeze(obj)
            Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.

    
    And also there are tests for them:

        1. Object.isExtensible(obj)
            Returns false if adding properties is forbidden, otherwise true.
        
        
        2. Object.isSealed(obj)
            Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.


        3. Object.isFrozen(obj)
            Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.


        These methods are rarely used in practice.

*/
