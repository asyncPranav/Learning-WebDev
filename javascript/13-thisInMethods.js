//------------> "this" in methods

/*
    When a method is called using dot notation like object.method(),
    the value of 'this' inside the method is the object on the left side of the dot.
*/

let user = {
    name : "Pranav",
    age : 30,
    sayHi() {
        //console.log( "Hi, I am " + name ); // Error: name is not defined : (can't access outer property directly)
        console.log( "Hi, I am " + this.name );
    }
};

user.sayHi();
console.log("\n");

/*
    user.sayHi() → the object before the dot is user
    So inside sayHi, "this" refers to user
    this.name becomes user.name → "Alice"
*/











//-------->  it’s also possible to access the object without this, by referencing it via the outer variable

let admin1 = {
    name : "Chaman",
    age : 40,
    sayHi() {
        console.log("Hi, I am " + admin1.name);
    }
};

admin1.sayHi();


/*
    But such code is unreliable. 
    If we decide to copy admin1 to another variable, 
    e.g. admin2 = admin1 and overwrite admin1 with something else, 
    then it will access the wrong object.
*/

let admin2 = admin1;
admin1 = null;

//admin2.sayHi(); // TypeError: Cannot read properties of null
console.log();

/*
If we used this.name instead of admin1.name inside the console.log(),
then the code would work.
*/








//--------> Example 2 – Multiple Objects

let user1 = {
    name : "Pranav",
    greet() {
        console.log( "Hi, I am " + this.name );
    }
};

let user2 = {
    name : "Ayush",
    greet : user1.greet
};

user1.greet(); 
user2.greet();
console.log();

/*
    In user1.greet(), the object before the dot is user1, so this.name = "Pranav"
    In user2.greet(), the object before the dot is user2, so this.name = "Ayush"

    📌 Key Rule:
        When you call object.function(), the object before the dot decides what 'this' is.

    💡 Line by Line:
        ✅ user1.greet();
            The object before the dot is user1
            So 'this' is user1
            this.name becomes user1.name → "Pranav"
            Output: "Hi, I'm Pranav"

        ✅ user2.greet();
            Now the object before the dot is user2
            So 'this' is user2
            this.name becomes user2.name → "Ayush"
            Output: "Hi, I'm Ayush"
    
    🔁 Even though both are using the same function, the "this" value changes depending on who is calling it.
        whoever.callsTheFunction() → 'this' becomes whoever

*/












//--------> Example 3 – this Depends on How You Call It

function sayName() {
  console.log(this.name);
}

let person = {
  name: "David",
  speak: sayName
};

person.speak(); // David
sayName();      // undefined (or window.name if not in strict mode)
console.log("\n");












//--------> “this” is not bound


/*
    'this' refers to the object that is calling the function
    It does NOT depend on where the function is defined
    It depends on how (or by which object) it is called at run-time
*/   

let student = { name : "Pranav" };
let teacher = { name : "Ashish" };

function sayHi() {
    console.log( "Hey, I am " + this.name );
}

student.sayHi = sayHi;
teacher.sayHi = sayHi;

student.sayHi();   // Here "this" -> student or this.name = student.name
teacher.sayHi();   // Here "this" -> teacher or this.name = teacher.name


/* 
    💡 Key Concept Recap:
        "this" in JavaScript is dynamic — 
        it depends on the object calling the function,
        not where the function was created.
*/










//--------> Arrow function have no “this” 

/*
    🧠 Normally, in JavaScript:
        “this” refers to the object that called the function.
    But arrow functions are special — they don’t have their own “this” .

    🚀 What do arrow functions do with this?
        Instead of creating their own “this”, they take “this” from the outer function where they are written.
        This is called lexical “this” — meaning, they "look up" this from where they are defined.
*/

let employee = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => console.log(this.firstName);
      arrow();
    }
};

employee.sayHi(); //Ilya



/*
    🔍 What’s happening here:
        1. sayHi() is a normal function inside the employee object.
            - So 'this' inside sayHi is employee.
        2. Inside sayHi(), we create an arrow function called arrow.
        3. Arrow functions don’t have their own this, so they use this from sayHi(), which is employee.
        4. So when we call arrow(), it shows this.firstName → employee.firstName → "Ilya".


    📌 Summary in Easy Words:
        Arrow functions do not create their own this.
        They use this from where they are written (the outer function).
        That’s why arrow() can access this.firstName even though it's not inside the object directly.
*/
