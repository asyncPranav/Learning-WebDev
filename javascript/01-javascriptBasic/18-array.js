//----------> There are two syntaxes for creating an empty array:

let arr = [];
let arr2 = new Array();
console.log(arr);
console.log(arr2);
console.log("\n");








//-----------> Initialisation

let fruits = ["Apple", "Orange", "Banana", "Guava"];
console.log(fruits);
console.log("\n");




//-----------> Access element

fruits = ["Apple", "Orange", "Banana", "Guava"];

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);
console.log(fruits[4]); //index out of bound -> undefined
console.log("\n");






//-----------> Replace or Add element

fruits = ["Apple", "Orange", "Banana", "Guava"];

fruits[1] = "Grapes";
console.log(fruits);

fruits[4] = "Blackberry";
console.log(fruits);
console.log("\n");





//-----------> No of elements in array : array's length

fruits = ["Apple", "Orange", "Banana", "Guava"];

console.log(fruits.length);
console.log("\n");






//---------> Array can store elements of any type

arr = [ "Apple", 2, { name : "Pranav", age : 23 }, true, function(){ console.log("Hello world");} ];

console.log(arr);
console.log(arr[2]);
arr[4]();
console.log("\n");








//------------> Get last elements with “at” : arr.at(i)

fruits = ["Apple", "Orange", "Banana", "Guava"];

console.log( fruits[fruits.length - 1] );

console.log( fruits.at(-1) );

console.log( fruits[-1] ); // return undefined , not valid in js
console.log("\n");









//-------------> Methods pop/push, shift/unshift

fruits = ["Apple", "Orange", "Banana", "Guava"];
console.log( fruits );

console.log( fruits.pop() );
console.log( fruits );

fruits.push("Pear"); // can add multiple elements too
console.log( fruits );

console.log( fruits.shift() );
console.log( fruits );

fruits.unshift("Mango"); // can add multiple elements too
console.log( fruits );
console.log("\n");








//-----------> Array is an object, thus it is copied by reference

let bikes = [ "Yamaha", "Hero" ];
let scooter = bikes;

console.log( bikes == scooter );

scooter.push("TVS");
console.log(bikes);
console.log("\n");








//------------> Spread operator

let num1 = [1,2,3];
let num2 = [4, 5, 6];

let wholeArray = [...num1, ...num2, 7, 8];
console.log(wholeArray);

let strSpreadArr = [..."12345"];
console.log(strSpreadArr); // [ '1', '2', '3', '4', '5' ]

strSpreadArr = [..."pranav"];
console.log(strSpreadArr); // [ 'p', 'r', 'a', 'n', 'a', 'v' ]
console.log("\n");









//------------> Create duplicate of an array : (i.e two different object)

let array1 = ["item1", "item2", "item3"];
console.log(array1);

// Method-01
let array2 = array1.slice(0);
console.log(array2);

array2.push("item4");
console.log(array2);
console.log(array1); //array1 remain unaffected
console.log(array1 === array2);
console.log();


// Method-02
let array3 = [].concat(array1);
console.log(array3);

array3.push("item4");
console.log(array3);
console.log(array1); //array1 remain unaffected
console.log(array1 === array3);
console.log();


// Method-03 : spread operator
let array4 = [...array1];
console.log(array4);

array4.push("item4");
console.log(array4);
console.log(array1); //array1 remain unaffected
console.log(array1 === array4);
console.log("\n");








//-----------> Loops

fruits = ["Apple", "Orange", "Banana", "Guava"];

for (let i = 0; i < fruits.length; i++) {
    console.log( fruits[i] );
}



fruits = ["Apple", "Orange", "Banana", "Guava"];

for (let item of fruits) {
    console.log(item); // item = Apple, Orange, Banana .....
}



fruits = ["Apple", "Orange", "Banana", "Guava"];

// Generally, we shouldn’t use for..in for arrays.
for (let index in fruits ) {
    console.log( fruits[index] ); //index = 0, 1, 2, 3, 4 ....
}
console.log("\n");










//---------> constant array

const furniture = ["chair", "table"];
console.log(furniture);

furniture.push("bed", "door");
console.log(furniture);

/*
    furniture array stored inn Heap memory : let's say address that furniture holding it 0x11
    by pushing , poping, shifting and unshifting etc we are not changing address/reference of furniture. it remains same i.e 0x11
    therefore, it is totally valid to do there operations
    what is not allowed : changing reference (reassigning furniture)
*/

console.log("\n");












//----------> A word about “length”

/*
    The length property automatically updates when we modify the array. 
    To be precise, it is actually not the count of values in the array, 
    but the greatest numeric index plus one.

    For instance, a single element with a large index gives a big length:
*/

fruits = [];
fruits[123] = "Apple";

console.log( fruits.length ); // 124

/*
    Note that we usually don’t use arrays like that.

    Another interesting thing about the length property is that it’s writable.

    We can manually change the length of an array.
        - Setting a smaller length truncates the array.
        - Setting a larger length creates empty slots (not undefined).
        - Setting length zero clears the array

    The process is irreversible, here’s the example:
*/

arr = [1, 2, 3, 4, 5];

console.log(arr);

arr.length = 10;
console.log(arr);

arr.length = 3;
console.log(arr);

arr.length = 0;
console.log(arr);
console.log("\n");








//------------> new Array()

let cars = new Array( "Suzuki", "Ford", "BMW", "Oddy" );

console.log(cars);
console.log(cars[2]);


/*
    If 'new Array' is called with a single argument which is a number, 
    then it creates an array without items, but with the given length.

    To avoid such surprises, we usually use square brackets, 
    unless we really know what we’re doing.
*/

let arrr = new Array(3);

console.log(arrr);
console.log(arrr.length);
console.log("\n");









//---------------> Multidimensional arrays

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix);
console.log( matrix[0][2] );
console.log("\n");







//------------> toString() method

arr = [1, 2, 3];

console.log(arr);

console.log( String(arr) === "1,2,3" ); // true

console.log( [] + 1 ); // "1"
console.log( [1] + 1 ); // "11"
console.log( [1,2] + 1 ); // "1,21"
console.log("\n");








//-----------> Don’t compare arrays with ==

console.log( [] == [] ); //false
console.log( [0] == [0] ); //false

console.log( 0 == [] ); //true
console.log( '0' == [] ); //false
console.log("\n");

/*
    So, how to compare arrays?

    That’s simple: don’t use the == operator. 
    Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.
*/












//------------> Array destructuring : read from obsidian for more info

const people = ["pranav", "vageesh", "prashant", "vikas"];
console.log(people);

//our task is to store its two element in two variables
let myVar1 = people[0];
let myVar2 = people[1];
console.log(myVar1);
console.log(myVar2);
console.log();


//using destructuring (shorthand in js)
let [myVar01, myVar02] = people;
console.log(myVar01);
console.log(myVar02);
console.log();


//store two elements in variable and two in an array (rest operator)
let [var1, var2, ...myArr] = people;
console.log(var1);
console.log(var2);
console.log(myArr);
console.log("\n");










//-----------> objects inside array : useful in real world application

let users = [
    { userId : 1, name : "pranav", gender : "male" },
    { userId : 2, name : "rupali", gender : "female" },
    { userId : 3, name : "vageesh", gender : "male" },
];
console.log(users);

// Task : print name of all users
for (let user of users) {
    console.log(user.name);
}
console.log("\n");








//----------------> Nested destructuring
users = [
    { userId : 1, name : "pranav", gender : "male" },
    { userId : 2, name : "rupali", gender : "female" },
    { userId : 3, name : "vageesh", gender : "male" },
];
console.log(users);

// Task : get saparate obj for each user
let [user1, user2, user3] = users;
console.log(user1);
console.log(user2);
console.log(user3);


// Task : we want name of user1 and gender of user3
let [{name}, , {gender}] = users;
console.log(name);
console.log(gender);

//if we want different variable name
let [{name: user1Name}, , {gender : user3Gender}] = users;
console.log(user1Name);
console.log(user3Gender);


// Task : we want name of user1 and gender of user2
[{name}, {gender}] = users;
console.log(name);
console.log(gender);




