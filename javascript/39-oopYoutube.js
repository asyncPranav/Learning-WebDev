// const userMethods = {
//     about : function() {
//         return `${this.name}, ${this.age}`;
//     },
//     isAdult : function() {
//         return this.age >= 18;
//     }
// };

// const user = {
//     name : "Pranav",
//     age : 12,
//     about : userMethods.about,
//     isAdult : userMethods.isAdult
// };

// console.log(user);
// console.log(user.about());
// console.log(user.isAdult());




// Problem : if you have to create hundreds of users 






/*---------------------------------------------------------------------------------*/


// Solution : create a function which will create user 



// function createUser(name, age) {
//     let user = {};

//     user.name = name;
//     user.age = age;

//     user.about = function() {
//         return `${this.name}, ${this.age}`;
//     };
//     user.isAdult = function() {
//         return this.age >= 18;
//     };
    
//     return user;
// }

// const user1 = createUser("Pranav", 12);
// const user2 = createUser("Atul", 22);

// console.log(user1);
// console.log(user1.about());

// console.log(user2);
// console.log(user2.about());



// Problem : each user has saparate about and isAdult method which in result occupy a lot of memory







/*---------------------------------------------------------------------------------*/


/*
    Solution : we created saparate object for user methods and provided reference of 
    those methods to all newly created user's method, so in memory only two methods of 
    userMethods obj are stored, rest user's methods are pointing to that methods
*/



// const userMethods = {
//     about : function() {
//         return `${this.name}, ${this.age}`;
//     },
//     isAdult : function() {
//         return this.age >= 18;
//     }
// }

// function createUser(name, age) {
//     let user = {};

//     user.name = name;
//     user.age = age;
//     user.about = userMethods.about;
//     user.isAdult = userMethods.isAdult;
    
//     return user;
// }

// const user1 = createUser("Pranav", 12);
// const user2 = createUser("Atul", 22);

// console.log(user1);
// console.log(user1.about());

// console.log(user2);
// console.log(user2.about());


/*
    Problem : we have to define method again and again in two places 
        1. Inside userMethods Object
        2. Inside createUser function
*/





/*---------------------------------------------------------------------------------*/


/*
    Solution
        1. Don't create empty user object manually -> let user = {}
        2. Use Object.create() method -> let user = Object.create(userMethods)
        3. It will set user's __proto__ to userMethods
*/



// const userMethods = {
//     about : function() {
//         return `${this.name}, ${this.age}`;
//     },
//     isAdult : function() {
//         return this.age >= 18;
//     }
// }

// function createUser(name, age) {
//     let user = Object.create(userMethods);

//     user.name = name;
//     user.age = age;
    
//     return user;
// }

// const user1 = createUser("Pranav", 12);
// const user2 = createUser("Atul", 22);

// console.log(user1);
// console.log(user1.about());

// console.log(user2);
// console.log(user2.about());




// Problem : we have to define saparate object for userMethods







/*---------------------------------------------------------------------------------*/



/*
    Solution : 
        1. use function's prototype to store user's method like about and isAdult
        2. create empty user object using Object.create() method
        3. pass createUser.prototype as parameter to Object.create() method
*/



// function createUser(name, age) {
//     let user = Object.create(createUser.prototype);

//     user.name = name;
//     user.age = age;
    
//     return user;
// }

// createUser.prototype.about = function() {
//     return `${this.name}, ${this.age}`;
// };
// createUser.prototype.isAdult = function() {
//     return this.age >= 18;
// };


// const user1 = createUser("Pranav", 12);
// const user2 = createUser("Atul", 22);

// console.log(user1);
// console.log(user1.about());

// console.log(user2);
// console.log(user2.about());



/*
    Problem : 
        1. we have to manually create empty user object using Object.create() method
        2. we have to manually set __proto__ by passing createUser.prototype to Object.create() method
        3. we have to manually return user object
*/






/*---------------------------------------------------------------------------------*/


/*
    Solution : using function constructor (new keyword)
        1. it automatically create empty obj and set this = {}
        2. it automatically return object i.e this
        3. it automatically set __proto__ of object (this) to createUser.prototype
*/


// function CreateUser(name, age) {
//     this.name = name;
//     this.age = age;    
// }

// CreateUser.prototype.about = function() {
//     return `${this.name}, ${this.age}`;
// };
// CreateUser.prototype.isAdult = function() {
//     return this.age >= 18;
// };


// const user1 = new CreateUser("Pranav", 12);
// const user2 = new CreateUser("Atul", 22);

// console.log(user1);
// console.log(user1.about());

// console.log(user2);
// console.log(user2.about());




/*
    Problem : does not it seem very tedius task to do , first create function constructor
    then add user methods to prototype of that function constructor like
    CreateUser.prototype.about = function() {...}
*/







/*---------------------------------------------------------------------------------*/



/*
    Solution : use class keyword
        1. In js classes are fake because whatever we do using class keyword , internally it happens like previous one
        2. we will create a class having same name as function constructor : CreateUsers
        3. we will define constructor within it same as function constructor but without name
        4. we will write user methods thereafter constructor directly that will get add to prototype

*/


// class CreateUser {
//     constructor(name, age){
//         console.log("constructor called");
//         this.name = name;
//         this.age = age;    
//     }

//     about() {
//         return `${this.name}, ${this.age}`;
//     }
//     isAdult() {
//         return this.age >= 18;
//     }
//     sing(song) {
//         return song;
//     }
// }

// const user1 = new CreateUser("Pranav", 12);
// const user2 = new CreateUser("Atul", 22);

// console.log(user1);
// console.log(user1.name);
// console.log(user1.about());
// console.log(user1.isAdult());
// console.log(user1.sing("la la la la lla"));
// console.log(Object.getPrototypeOf(user1)); //in  nodejs : {} , and in browser : {about: ƒ, isAdult: ƒ}


// console.log(user2);
// console.log(user2.about());





/*---------------------------------------------------------------------------------*/


// Class Practice 


// class Animal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     eat() {
//         return `${this.name} is eating`;
//     }

//     isCute() {
//         return this.age <= 1;
//     }
// }

// let animal = new Animal("Jack", 2);
// console.log(animal);
// console.log(animal.name);
// console.log(animal.age);
// console.log(animal.eat());
// console.log(animal.isCute());




// class Dog {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     eat() {
//         return `${this.name} is eating`;
//     }

//     isCute() {
//         return this.age <= 1;
//     }
// }


// let dog = new Dog("Tom", 1);
// console.log(dog);
// console.log(dog.name);
// console.log(dog.age);
// console.log(dog.eat());
// console.log(dog.isCute());




// Problem : writing same method again and again in two classes 






/*---------------------------------------------------------------------------------*/



// Solution : Inheritance 

// class Animal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     eat() {
//         return `${this.name} is eating`;
//     }
//     isCute() {
//         return this.age <= 1;
//     }
// }

// class Dog extends Animal{

// }


// let dog1 = new Dog("Tom", 1);
// console.log(dog1);
// console.log(dog1.name);
// console.log(dog1.age);
// console.log(dog1.eat());
// console.log(dog1.isCute());

// let dog2 = new Dog("Cherry", 1, 90);
// console.log(dog2); // Dog { name: 'Tom', age: 1 }



// Problem : If we want to add more properties(speed) to dog in addition to name and age then it will not work here







/*---------------------------------------------------------------------------------*/


/*
    Solution : 
        1. before we have not define any constructor for Dog 
        2. creating obj/instance of Dog was using Animal's constructor for setting properties
        3. now since we have to add some extra properties,  we have to declare sapparate constructor for Dog
        4. we can still use super class's constructor for setting name and age property via super constructor chaining
*/


// class Animal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     eat() {
//         return `${this.name} is eating`;
//     }
//     isCute() {
//         return this.age <= 1;
//     }
// }

// class Dog extends Animal{
//     constructor(name, age, speed) {
//         super(name, age); // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//         this.speed = speed;
//     }
//     run() {
//         return `${this.name} running at ${this.speed} km/h`;
//     }
// }


// let dog = new Dog("Tom", 1, 80);
// console.log(dog);
// console.log(dog.name);
// console.log(dog.age);
// console.log(dog.eat());
// console.log(dog.isCute());
// console.log(dog.run());






/*---------------------------------------------------------------------------------*/



/*
    Javascript will search for any property or method in child class first, and if it did not find
    then it will look for those property or method in parent class

    Due to this reason : eat() method of Dog will run instead of Animal
*/




// class Animal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     eat() {
//         return `${this.name} is eating`;
//     }
//     isCute() {
//         return this.age <= 1;
//     }
// }

// class Dog extends Animal{
//     constructor(name, age, speed) {
//         super(name, age); // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//         this.speed = speed;
//     }
//     eat() {
//         return `Modfied Eat : ${this.name} is eating`;
//     }
//     run() {
//         return `${this.name} running at ${this.speed} km/h`;
//     }
// }


// let dog = new Dog("Tom", 1, 80);
// console.log(dog);

// console.log(dog.eat()); // Modfied Eat : Tom is eating








/*---------------------------------------------------------------------------------*/



// Getter and Setter

// class Person {
//     constructor(fName, lName, age) {
//         this.fName = fName;
//         this.lName = lName;
//         this.age = age;
//     }

//     // fullName() {
//     //     return `${this.fName} ${this.lName}`;
//     // }
//     get fullName() {
//         return `${this.fName} ${this.lName}`;
//     }

//     // setFullName(fName, lName) {
//     //     this.fName = fName;
//     //     this.lName = lName;
//     // }
//     // set fullName(fName, lName) {  // SyntaxError: Setter must have exactly one formal parameter.
//     //     this.fName = fName;
//     //     this.lName = lName;
//     // }
//     set fullName(input) {
//         [this.fName, this.lName] = input.split(" ");
//     }
// }

// const p1  = new Person("Pranav", "singh", 12);
// console.log(p1);
// console.log(p1.fName); //property
// console.log(p1.lName); //property
// // console.log(p1.fullName()); //method : fullName() {...}

// console.log(p1.fullName); //method : get fullName() {...}

// // if we use paranthesis
// // console.log(p1.fullName()); // Error: p1.fullName is not a function
// console.log();


/*
    1. we want to get same output from -> console.log(p1.fullName);
    2. we want to use method as property just like : p1.fullName without ()
    3. we can do it using getter metthod : just add 'get' keyword before fullName fn in Person
    
        fullName() {
            return `${this.fName} ${this.lName}`;
        }

        get fullName() {
            return `${this.fName} ${this.lName}`;
        }

*/

// change person's name

// console.log(p1); // Person { fName: 'Pranav', lName: 'singh', age: 12 }

// p1.fName = "Ayush";
// p1.lName = "singh";
// console.log(p1); // Person { fName: 'Ayush', lName: 'singh', age: 12 }




//same we can do it using setFullName() method

// console.log(p1); // Person { fName: 'Pranav', lName: 'singh', age: 12 }

// p1.setFullName("Atul", "singh");
// console.log(p1); // Person { fName: 'Atul', lName: 'singh', age: 12 }





//same we can do it with setter method 

// console.log(p1); // Person { fName: 'Pranav', lName: 'singh', age: 12 }

// p1.fullName = "Atul singh";
// console.log(p1); // Person { fName: 'Atul', lName: 'singh', age: 12 }






/*---------------------------------------------------------------------------------*/



// Static method and properties


/*
    Problem :

        Here all methods of class are related to object/instance
            - get fullName()
            - set fullName()
            - eat()
            - isCute()

            we can't call them without object, can called upon object only, Ex - 
                const p1 = new Person("Pranav", "chandel", 20);
                console.log(p1.eat());


    Solution :

        We can create such methods which are directly related to the class. we do not need to 
        create object to call those methods. 
            - using 'static' keyword

                We can call them directly upon the class

                    static classInfo() {
                        return "this is Person class";
                    }

                    console.log(Person.classInfo()); // this is Person class


                    
        we can have both static properties as well as static methods
*/


class Person {
    constructor(fName, lName, age) {
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }

    get fullName() {
        return `${this.fName} ${this.lName}`;
    }

    set fullName(input) {
        [this.fName, this.lName] = input.split(" ");
    }

    eat() {
        return `${this.fullName} is eating`;
    }

    isCute() {
        return this.age <= 1;
    }

    static classInfo() {
        return "this is Person class";
    }
}

const p1 = new Person("Pranav", "chandel", 20);
console.log(p1);

console.log(p1.eat());

console.log(Person.classInfo()); // this is Person class

