//---------------> Prototypal inheritance

/*
    In programming, we often want to take something and extend it.

    For instance, we have a user object with its properties and methods, and want to make 
    admin and guest as slightly modified variants of it. We’d like to reuse what we have in 
    user, not copy/reimplement its methods, just build a new object on top of it.

    Prototypal inheritance is a language feature that helps in that.
*/








//---------------> [[Prototype]]

/*
    In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), 
    that is either null or references another object. That object is called “a prototype”:

    When we read a property from object, and it’s missing, JavaScript automatically takes it 
    from the prototype. In programming, this is called “prototypal inheritance”. 
    And soon we’ll study many examples of such inheritance, as well as 
    cooler language features built upon it.

    The property [[Prototype]] is internal and hidden, but there are many ways to set it.

    One of them is to use the special name __proto__, like this:
*/


let animal = {
    eat : true
};

let rabbit = {
    jump : true
};

rabbit.__proto__ = animal; //(*) sets rabbit.[[Prototype]] = animal (animal is prototype)


// Now if we read a property from rabbit, and it’s missing, JavaScript will automatically take it from animal.
console.log(rabbit.eat); //(**)
console.log(rabbit.jump);

/*
    we can find both properties in rabbit now: eat and jump both

    Here the line (*) sets animal to be the prototype of rabbit.

    Then, when console.log() tries to read property rabbit.eats (**), it’s not in rabbit, 
    so JavaScript follows the [[Prototype]] reference and finds it in animal

    Here we can say that “animal is the prototype of rabbit” or 
    “rabbit prototypically inherits from animal”.

    So if animal has a lot of useful properties and methods, then they become automatically 
    available in rabbit. Such properties are called “inherited”.

    If we have a method in animal, it can be called on rabbit:

*/

animal = {
    eat : true,
    walk() {
        console.log("Animal walk");
    }
};

rabbit = {
    jump : true,
    __proto__ : animal
};

rabbit.walk(); // Animal walk (walk method is taken from the prototype animal)





// The prototype chain can be longer:

animal = {
    eat : true,
    walk() {
        console.log("Animal walk");
    }
};

rabbit = {
    jump : true,
    __proto__ : animal
};

let longEar  = {
    earLength : 20,
    __proto__ : rabbit
};

longEar.walk(); // Animal walk (walk method is taken from the prototype chain)
console.log(longEar.jump); // true (from rabbit)


/*

    Now if we read something from longEar, and it’s missing, JavaScript will look for 
    it in rabbit, and then in animal.

    There are only two limitations:
        1. The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
        2. The value of __proto__ can be either an object or null. Other types are ignored.
    
    
    Also it may be obvious, but still: there can be only one [[Prototype]]. 
    An object may not inherit from two others.


    ‼️ __proto__ is a historical getter/setter for [[Prototype]]

        It’s a common mistake of novice developers not to know the difference 
        between these two.

        Please note that __proto__ is not the same as the internal [[Prototype]] property. 
        It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, 
        for now let’s just keep it in mind, as we build our understanding of JavaScript language.

        The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript 
        suggests that we should use Object.getPrototypeOf/Object.setPrototypeOf functions 
        instead that get/set the prototype. We’ll also cover these functions later.

        By the specification, __proto__ must only be supported by browsers. 
        In fact though, all environments including server-side support __proto__, 
        so we’re quite safe using it.

        As the __proto__ notation is a bit more intuitively obvious, we use it in the examples.



    🧠 Summary:

        | Term                      | Internal or External  | Use Case                                     |
        | ------------------------- | --------------------  | -------------------------------------------- |
        |   [[Prototype]]           | Internal              | The actual hidden link between objects       |
        |   __proto__               | External (legacy)     | A way to get/set prototype (not recommended) |
        |   Object.getPrototypeOf() | ✅ Modern             | Get the prototype safely                     |
        |   Object.setPrototypeOf() | ✅ Modern             | Set the prototype safely                     |

*/
console.log("\n");








//-----------------------> Writing doesn’t use prototype

/*
    The prototype is only used for reading properties.

    Write/delete operations work directly with the object.

    In the example below, we assign its own walk method to rabbit:

*/

animal = {
    eat : true,

    //this method won't be used by rabbit
    walk() {
        console.log("Animal walk");
    }
};

rabbit = {
    jump : true,
    __proto__ : animal
};

rabbit.walk = function() {
    console.log("Rabbit walk");
};

rabbit.walk(); // Rabbit walk


/*
    From now on, rabbit.walk() call finds the method immediately in the object 
    and executes it, without using the prototype animal

    Accessor properties are an exception, as assignment is handled by a setter function. 
    So writing to such a property is actually the same as calling a function.


    📌 Accessor Properties (get/set) behave like functions:

        - When you assign to an accessor property (e.g., user.fullName = "Atul singh"),
          it doesn't store the value directly — it calls the setter function.
        
        - When you access an accessor property (e.g., user.fullName),
          it calls the getter function and returns what that function returns.

    So, assignment and reading are just function calls behind the scenes.


    For that reason admin.fullName works correctly in the code below:

*/


let user = {
    fName : "Pranv",
    lName : "Singh",

    get fullName() {
        return `${this.fName} ${this.lName}`;
    },

    set fullName(value) {
        [this.fName, this.lName] = value.split(" ");
    }
};

let admin = {
    __proto__ : user,
    isAdmin : true
};

console.log(admin.fullName); // Pranv Singh (*)

// setter triggers!
admin.fullName = "Atul singh"; // (**)

console.log(admin.fullName); // Atul singh, state of admin modified
console.log(user.fullName); // Pranv Singh, state of admin protected

/*
    Here in the line (*) the property admin.fullName has a getter in the prototype user, 
    so it is called. And in the line (**) the property has a setter in the prototype, 
    so it is called.
*/


/*
    🧠 Key Concepts Before We Start

        - get fullName() → lets you read fullName from fName + lName.
        - set fullName(value) → lets you write fullName, and it splits the string into fName and lName.
        - admin.__proto__ = user means: admin inherits all properties and methods from user, but keeps its own data.



    🔎 Step-by-Step Breakdown

        Step 1: Base user object

            let user = {
                fName: "Pranv",
                lName: "Singh",

                get fullName() {
                    return `${this.fName} ${this.lName}`;
                },

                set fullName(value) {
                    [this.fName, this.lName] = value.split(" ");
                }
            };


            - user.fullName will return "Pranv Singh"
            - If you set user.fullName = "Atul Singh", it will update user.fName and user.lName




        Step 2: Create admin object that inherits from user

            let admin = {
                __proto__: user,
                isAdmin: true
            };

            - admin inherits from user
            - It doesn’t yet have its own fName or lName
            - So admin.fullName accesses user.fullName using this = admin



        
        Step 3: console.log(admin.fullName);

            console.log(admin.fullName); // "Pranv Singh"

            - There’s no fullName in admin, so it looks in user (prototype)
            - Runs get fullName(), where this is admin
            - admin has no fName, so it falls back to user.fName → "Pranav"
            - Same for lName → "Singh"




        Step 4: admin.fullName = "Atul singh";

            admin.fullName = "Atul singh";

            This runs the setter function set fullName(value) inherited from user.

            Inside that setter:

                [this.fName, this.lName] = value.split(" ");

                - this is admin
                - So now admin gets its own fName and lName properties:

                admin.fName = "Atul";
                admin.lName = "singh";




        Step 5: Check result

            console.log(admin.fullName); // "Atul singh"

                - Getter now reads from admin.fName and admin.lName

            console.log(user.fullName); // "Pranv Singh"

                - Still untouched — user.fName and user.lName not changed




    ✅ Summary (Important Insight)

        Even though admin inherits the getter and setter from user, the this inside them 
        refers to admin — the object you called it on.

        So:
        - admin.fullName = "Atul singh" only updates admin
        - user stays safe and unchanged

*/
console.log("\n");









//-------------------> The value of “this”


/*
    An interesting question may arise in the example above: what’s the value of this 
    inside set fullName(value)? Where are the properties this.name and 
    this.surname written: into user or admin?

    The answer is simple: this is not affected by prototypes at all.

    No matter where the method is found: in an object or its prototype. In a method call, 
    this is always the object before the dot.

    So, the setter call admin.fullName = ".." uses admin as this, not user.

    That is actually a super-important thing, because we may have a big object with many 
    methods, and have objects that inherit from it. And when the inheriting objects 
    run the inherited methods, they will modify only their own states, 
    not the state of the big object.


    For instance, here animal represents a “method storage”, and rabbit makes use of it.

    The call rabbit.sleep() sets this.isSleeping on the rabbit object:

*/


animal = {
    walk() {
        if (!this.isSleeping) {
            console.log("Walk");
        }
    },
    sleep() {
        this.isSleeping = true
    }
};

rabbit = {
    name : "White Rabbit",
    __proto__ : animal
};

/*
    📌 For Understanding

        animal.walk(); // walk
        console.log(animal); // { walk: [Function: walk], sleep: [Function: sleep] }

        animal.sleep(); // set isSleeping property to the animal
        console.log(animal); // { walk: [Function: walk], sleep: [Function: sleep], isSleeping: true }
        


        rabbit.walk(); // walk
        console.log(rabbit); // { name: 'White Rabbit' }
        
        rabbit.sleep(); // set isSleeping property to the rabbit
        console.log(rabbit); // { name: 'White Rabbit', isSleeping: true }
    
*/



// modifies rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (no such property in the prototype - animal)


/*
    If we had other objects, like bird, snake, etc., inheriting from animal, 
    they would also gain access to methods of animal. But this in each method call would be 
    the corresponding object, evaluated at the call-time (before dot), not animal. 
    So when we write data into this, it is stored into these objects.

    As a result, methods are shared, but the object state is not.
*/
console.log("\n");











//---------------------> for...in loop


// The for..in loop iterates over inherited properties too. For instance:

animal = {
    eats: true,
};

rabbit = {
    jumps: true,
    __proto__: animal,
};

// Object.keys only returns own keys
console.log(Object.keys(rabbit)); // [ 'jumps' ]

// for..in loops over both own and inherited keys
for (let prop in rabbit) console.log(prop); // jumps, then eats



/*
    If that’s not what we want, and we’d like to exclude inherited properties, 
    there’s a built-in method obj.hasOwnProperty(key): it returns true if 
    obj has its own (not inherited) property named key.

    So we can filter out inherited properties (or do something else with them):
*/

animal = {
    eats: true,
};

rabbit = {
    jumps: true,
    __proto__: animal,
};

for (let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);

    if (isOwn) {
        console.log(`Our: ${prop}`); // Our: jumps
    } else {
        console.log(`Inherited: ${prop}`); // Inherited: eats
    }
}

//read theory of this topic from js info 
