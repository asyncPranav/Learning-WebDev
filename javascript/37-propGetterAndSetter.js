//-------------------> Property getters and setters

/*
    There are two kinds of object properties.

    The first kind is data properties. We already know how to work with them. 
    All properties that we’ve been using until now were data properties.

    The second type of property is something new. It’s an accessor property. 
    They are essentially functions that execute on getting and setting a value, 
    but look like regular properties to an external code.
*/








//----------------> Getters and setters


/*
    Accessor properties are represented by “getter” and “setter” methods. 
    In an object literal they are denoted by get and set:


    🧠 What are Getters and Setters?

        They are special methods used to control access to object properties.
            get	: Used to read a property
            set	: Used to write/change a property


    ✅ Why Use Them?

        - To control, validate, or modify how a property is accessed
        - To simulate computed properties
        - To hide internal structure or format data nicely
        - To trigger side effects when values are changed (e.g., logging, updating UI)



    🧾 Basic Syntax :

        let obj = {
            get propName() {
                // getter, the code executed on getting obj.propName
            },

            set propName(value) {
                // setter, the code executed on setting obj.propName = value
            }
        };

        The getter works when obj.propName is read, the setter – when it is assigned.

*/


let user = {
    fName : "Pranav",
    lName : "Singh",
    age : 3,

    sayHi() {
        return "Hi from " + this.fName;
    },

    get fullName() {
        return `${this.fName} ${this.lName}`;
    }
};

console.log(user);

console.log(user.sayHi);
console.log(user.sayHi());

console.log(user.fullName); // Even though you didn't write user.fullName(), it runs like a function. That’s the beauty of get.


/*
From the outside, an accessor property looks like a regular one. That’s the idea 
of accessor properties. We don’t call user.fullName as a function, 
we read it normally: the getter runs behind the scenes.
*/



// As of now, fullName has only a getter. If we attempt to assign user.fullName=, there will be an error:

user.fullName = "Test"; // nothing happens here

/*
    ❌ This does nothing, because:

        - You only defined a getter, not a setter.
        - So JavaScript ignores this silently in non-strict mode.
        - In strict mode ("use strict"), it would throw a TypeError: Cannot set property fullName which has only a getter

*/
console.log();




// Let’s fix it by adding a setter for user.fullName:

user = {
    fName : "Pranav",
    lName : "Singh",

    get fullName() {
        return `${this.fName} ${this.lName}`;
    },

    set fullName(value) {
        [this.fName, this.lName] = value.split(" ");
    }
};

console.log(user);

console.log(user.fullName);

user.fullName = "Atul Chandel";
console.log(user.fullName);

console.log(Object.keys(user));


/*
    As the result, we have a “virtual” property fullName. It is readable and writable.

    💡 “Virtual” Property – What Does It Mean?

        A virtual property is a property that:
            - Looks like a normal property when you access or assign to it (user.fullName)
            - But doesn’t actually store any value on its own
            - Instead, it is calculated (get) or processed (set) using special logic

    So it behaves like a real property — but it’s not really “stored” inside the object.

*/
console.log("\n");







//----------------> Accessor descriptors

/*
    🧠 What is a Descriptor?
        A property descriptor is an object that tells JavaScript how a property behaves:
        Whether it can be read, written, shown in loops, deleted, etc.



    🚩 Two Types of Descriptors

        When you define or look at a property in JavaScript, it can be one of two types:

        | Descriptor Type            | Used when...                                        |
        | -------------------------- | --------------------------------------------------- |
        |    Data Descriptor         | You store a **value** in the property               |
        |    Accessor Descriptor     | You define a **getter or setter** (using functions) |



    🔹 Example of Data Descriptor

        let user = {};
        Object.defineProperty(user, "name", {
            value: "Pranav",
            writable: true,
            enumerable: true,
            configurable: true
        });

        This stores the value "Pranav".



    🔹 Example of Accessor Descriptor

        let user = {};
            Object.defineProperty(user, "fullName", {
            get() {
                return "Pranav Singh";
            },
            set(value) {
                console.log("Setting fullName to", value);
            },
            enumerable: true,
            configurable: true
        });


        This one does not store any value. Instead, it runs code when:
            - You read user.fullName → it runs the get() function
            - You write to user.fullName = "..." → it runs the set() function




    🔁 Data vs Accessor Descriptors

        | Feature       |  Data Descriptor                 |  Accessor Descriptor           |
        | ------------- | -------------------------------- | ------------------------------ |
        | Stores value? | ✅ Yes → `value: "Pranav"`       | ❌ No stored value             |
        | Has getter?   | ❌ No                            | ✅ Yes → `get() { ... }`       |
        | Has setter?   | ❌ No                            | ✅ Yes → `set(value) { ... }`  |
        | Writable?     | ✅ Yes/No using `writable: true` | ❌ Not used with getter/setter |
        | Enumerable?   | ✅ Yes/No                        | ✅ Yes/No                      |
        | Configurable? | ✅ Yes/No                        | ✅ Yes/No                      |

*/




/* -> From Js info web

    Descriptors for accessor properties are different from those for data properties.

    For accessor properties, there is no value or writable, but instead there are 
    get and set functions.

    That is, an accessor descriptor may have:
        . get – a function without arguments, that works when a property is read,
        . set – a function with one argument, that is called when the property is set,
        . enumerable – same as for data properties,
        . configurable – same as for data properties.

    For instance, to create an accessor fullName with defineProperty, we can pass a 
    descriptor with get and set:
*/


user = {
    fName : "Pranav",
    lName : "Chandel"
};

Object.defineProperty(user, "fullName", {
    get() {
        return `${this.fName} ${this.lName}`;
    },
    set(value) {
        [this.fName, this.lName] = value.split(" ");
    }
});

console.log(user);

console.log(user.fullName);

user.fullName = "Atul Singh";
console.log(user.fullName);


/*
    Please note that a property can be either an accessor (has get/set methods) or a 
    data property (has a value), not both.

    If we try to supply both get and value in the same descriptor, there will be an error:
*/


// valid : prop is data descriptor only
let obj = Object.defineProperty({}, "prop", {
    value: 2
});
console.log(obj.prop);

// valid : prop is accessor descriptor only
obj = Object.defineProperty({}, "prop", {
    get() {
        return 1;
    }
});
console.log(obj.prop);

// invalid : prop is data and accessor descriptor both
// obj = Object.defineProperty({}, "prop", {
//     get() {
//         return 1;
//     },
//     value: 2,
// });
// console.log(obj.prop);


/*
    🧠 Summary

    |   Type of Descriptor    | Keys Allowed                                      |
    | ----------------------- | ------------------------------------------------- |
    |   Data Descriptor       |  value, writable, enumerable, configurable        |
    |   Accessor Descriptor   |  get, set, enumerable, configurable               |

*/
console.log("\n");








//------------------> Smarter getters/setters


/*
    Getters/setters can be used as wrappers over “real” property values to gain more 
    control over operations with them.

    For instance, if we want to forbid too short names for user, we can have a setter 
    name and keep the value in a separate property _name:
*/


user = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            console.log("Too short name, need at least 4 char");
            return;
        }
        this._name = value;
    },
};

console.log(user);
console.log(Object.getOwnPropertyNames(user));

user.name = "Pete";
console.log(user.name);

console.log(user);
console.log(Object.getOwnPropertyNames(user));






/*
    📌 Understanding Getter and Setter with _name in JavaScript

        🔍 You're asking:
            We didn’t define a name property. So how can get name() and set name() work?

        ✅ Here's the key idea:
            get name() and set name() are the name property.
            They define the property, just in a different way.


        📦 Normal property vs Getter/Setter property:

            // Normal property
            let user = {
                name: "Pranav" // Just holds a value
            };

            // Accessor property
            let user = {
                get name() {
                    return this._name;
                },
                set name(value) {
                    this._name = value;
                }
            };

        💡 When you define get name() and/or set name(), you're telling JavaScript:
            “This object has a property called name. But instead of just storing a value, 
            I will use functions to control what happens when someone gets or sets it.”




        🔁In this example above, we are using a getter and setter to define a virtual property called `name`.

            1. The get name() method runs whenever we access user.name
            2. The set name(value) method runs whenever we assign to user.name




        💡 What is _name?

            _name is just a normal property — a variable inside an object.
            It starts with an underscore (_) just as a naming convention. It's not special to JavaScript.

                this._name = "Pranav";

                Here 
                    1. this refers to the object (like user)
                    2. _name is the actual place where we store the value
                    3. It is not connected to any getter or setter



        🧠 Internally, the setter saves the value in another property called `_name`
            - We use `_name` (with underscore) to avoid calling the setter again (infinite loop)
            - This is a common naming convention for internal/private data
            - You can name it _name, __name, secretName, anything you like — just don’t name it name, or you’ll create a loop!




        🔍 Why do we use _name?
            Let's say we have used -> this.name = value;?

                set name(value) {
                    this.name = value; // ❌
                }


            Now see what happens behind the scenes:
                - You write: user.name = "Aman"
                - That triggers the setter: set name(value)
                - Inside it, you again do: this.name = value → it calls the setter again
                - That again runs: this.name = value → again setter
                - Again... and again... and again... 🔁💥

            This is called an infinite loop or recursive call. It never stops.
            Eventually, the browser or Node.js will give you an error: Maximum call stack size exceeded



        ⚠️ IMPORTANT: The `_name` property does NOT exist until the setter runs!
            So if you check Object.getOwnPropertyNames(user) BEFORE calling user.name = "Pete",
            you'll only see ["name"] and NOT "_name"
            
            Always assign user.name = "SomeName" before inspecting internal props like _name



        🧠 Why did this happen?

            Because:
                - get name() and set name() define a virtual property called name
                - But _name is only created dynamically when the setter runs


*/






















































































































































