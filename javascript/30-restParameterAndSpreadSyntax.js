/*
  Many JavaScript built-in functions support an arbitrary number of arguments.

  For instance:
    - Math.max(arg1, arg2, ..., argN) – returns the greatest of the arguments.
    - Object.assign(dest, src1, ..., srcN) – copies properties from src1..N into dest.

  In this chapter we’ll learn how to do the same. And also, how to pass arrays to such functions as parameters.
*/






//-----------------------> Rest parameters(...) : A function can be called with any number of arguments, no matter how it is defined.


function sum(a, b) {
  return a + b;
}
console.log( sum(1, 2, 3, 4, 5) );

/*
  There will be no error because of “excessive” arguments. But of course in the result 
  only the first two will be counted, so the result in the code above is 3.

  The rest of the parameters can be included in the function definition by using 
  three dots ... followed by the name of the array that will contain them. 
  The dots literally mean “gather the remaining parameters into an array”.

  For instance, to gather all arguments into array args:

*/

function sumAll(...args) {

  //method-01
  /*
    let sum = 0;
    for (let arg of args) {
      sum += arg;
    }
    return sum;
  */
  
  //method-02
  return args.reduce((acc, curr) => acc + curr, 0);
}
console.log( sumAll(1,2,3,4,5) );
console.log( sumAll(1,2,3,4,5,6,7,8,9,10) );


/*
  We can choose to get the first parameters as variables, and gather only the rest.
  rest parameter must be at end always else it will give error
*/

function showName(firstName, lastName, ...title) {
  console.log(`firstName : ${firstName}`);
  console.log(`lastName : ${lastName}`);
  console.log(`title : ${title}`);
  console.log(`title[0] : ${title[0]}`);
  console.log(`title[1] : ${title[1]}`);
  console.log(`is title array : ${Array.isArray(title)}`);
}
showName("Pranav", "Chandel", "Coder", "Developer", "Engineer");
console.log("\n");









//--------------------------> JavaScript "arguments" Object 


/*
  ✅ What is arguments?

    1. arguments is a special object available inside all regular functions (not arrow functions).
    2. It holds all the arguments passed to the function, even if they aren’t named in the function definition.
    3. It behaves like an array, but is not a real array (it doesn't have array methods like .map(), .filter(), etc.).

  In old times, rest parameters did not exist in the language, and using arguments was the only 
  way to get all arguments of the function. And it still works, we can find it in the old code.

  But the downside is that although arguments is both array-like and iterable, it’s not an array. 
  It does not support array methods, so we can’t call arguments.map(...) for example.

  Also, it always contains all arguments. We can’t capture them partially, like we did with rest parameters.

  So when we need these features, then rest parameters are preferred.

*/




function showArguments() {

  //array like object
  console.log(arguments);
  console.log(arguments[0]);
  console.log(arguments.length);

  //iterable
  for (let arg of arguments) {
    console.log(arg);
  }

  //array methods are not valid on arguments
  
}
showArguments("apple", "banana", "mango");


// Arrow functions do not have "arguments"

/*
  let arrowShowArguments = () => {
    for(let arg of arguments) {
      console.log(arg);
    }
  }
  arrowShowArguments("apple", "banana", "mango"); //error
*/
 
function f() {
  let arrowShowArguments = () => {
    for(let arg of arguments) {
      console.log(arg);
    }
  }
  arrowShowArguments();
}
f("Pranav", "Atul", "Vageesh");
console.log("\n");










//--------------------------> Spread syntax

/*
  We’ve just seen how to get an array from the list of parameters.

  But sometimes we need to do exactly the reverse.

  For instance, there’s a built-in function Math.max that returns the greatest number from a list:
    console.log( Math.max(3, 5, 1) ); -> 5

  Now let’s say we have an array [3, 5, 1]. How do we call Math.max with it?
  Passing it “as is” won’t work, because Math.max expects a list of numeric arguments, not a single array:

  let arr = [3, 5, 1];
  console.log( Math.max(arr) ); // NaN

  And surely we can’t manually list items in the code Math.max(arr[0], arr[1], arr[2]), 
  because we may be unsure how many there are. As our script executes, there could be a lot, 
  or there could be none. And that would get ugly.

  Spread syntax to the rescue! It looks similar to rest parameters, also using 3 dot (...) 
  but does quite the opposite.

  When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

  For Math.max:
*/

let arr = [3, 5, 1];
console.log( Math.max(...arr) );


// We also can pass multiple iterables this way:

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
console.log( Math.max(...arr1, ...arr2) );


// We can even combine the spread syntax with normal values:

arr1 = [1, -2, 3, 4];
arr2 = [8, 3, -8, 1];
console.log( Math.max(9, 10, 23, ...arr1, ...arr2) );


// Also, the spread syntax can be used to merge arrays:

arr1 = [1, -2, 3, 4];
arr2 = [8, 3, -8, 1];
let merged = [0, ...arr1, 6, 7, ...arr2];
console.log(merged);


/*
  In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.
  For instance, here we use the spread syntax to turn the string into array of characters:
*/

let str = "Pranav";
console.log( [...str] );

/*
  The spread syntax internally uses iterators to gather elements, the same way as for..of does.

  So, for a string, for..of returns characters and ...str becomes "H","e","l","l","o". 
  The list of characters is passed to array initializer [...str].

  For this particular task we could also use Array.from, because it converts an 
  iterable (like a string) into an array:

  The result is the same as [...str].

  But there’s a subtle difference between Array.from(obj) and [...obj]:
    - Array.from operates on both array-likes and iterables.
    - The spread syntax works only with iterables.

  So, for the task of turning something into an array, Array.from tends to be more universal.

*/

str = "Hello";

// Array.from converts an iterable into an array
console.log( Array.from(str) );
console.log("\n");












//-----------------------> Copy an array/object


// 🧾 1. Copying an Array

// ✅ A. Shallow Copy (most common)


// 📌 Using slice()
arr = [1, 2, 3];
let copy = arr.slice();
console.log(copy); // [1, 2, 3]


// 📌 Using Spread [...]
copy = [...arr];
console.log(copy); // [1, 2, 3]


// 📌 Using Array.from()
copy = Array.from(arr);
console.log(copy); // [1, 2, 3]


// ⚠️ All of these are shallow copies. If the array contains objects, those objects are still shared.
arr = [{a: 1}, {b: 2}];
copy = [...arr];
arr[0].a = 99;
console.log(copy[0].a); // 99




// ✅ B. Deep Copy


// 📌 Using structuredClone() – Modern & Best 🔥
arr = [1, 2, [3, 4], { name: "Alice" }];

let deepCopy = structuredClone(arr);

arr[2][0] = 99;
arr[3].name = "Bob";
console.log(deepCopy); // [1, 2, [3, 4], { name: "Alice" }]


// 📌 Using JSON.parse(JSON.stringify(...)) – Classic method
arr = [1, 2, [3, 4], { name: "Alice" }];
deepCopy = JSON.parse(JSON.stringify(arr));

arr[2][0] = 100;
arr[3].name = "Bob";

console.log(deepCopy); // [1, 2, [3, 4], { name: "Alice" }]







// 🧾 2. Copying an Object


// ✅ A. Shallow Copy


// 📌 Using Object.assign()
let obj = { name: "Alice", age: 25 };
copy = Object.assign({}, obj);
console.log(copy); // { name: 'Alice', age: 25 }


// 📌 Using Spread {...}
copy = { ...obj };
console.log(copy); // { name: 'Alice', age: 25 }


// Again, if the object has nested objects, they are not deeply copied.
obj = { user: { name: "John" } };
copy = { ...obj };
obj.user.name = "Changed";
console.log(copy.user.name); // "Changed" ❗




// ✅ Deep Copy (Clone Everything)


// 📌  Using structuredClone() (modern and recommended)
let original = {
  name: "Alice",
  info: {
    age: 25,
    hobbies: ["reading", "music"]
  }
};

let clone = structuredClone(original);

original.info.age = 30;
console.log(clone.info.age); // ✅ 25 (not changed)

/*
  ✅ Works with:
    - Objects
    - Arrays
    - Dates
    - Maps
    - Sets

  ❌ Does not support functions, DOM nodes, or prototype methods.

*/


// 📌  JSON Method (for simple data only)
original = {
  name: "Bob",
  skills: ["JavaScript", "Python"]
};

clone = JSON.parse(JSON.stringify(original));

original.skills.push("C++");
console.log(clone.skills); // ✅ ['JavaScript', 'Python']

