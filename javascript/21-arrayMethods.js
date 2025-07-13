//-------------> Add/remove items

let fruits = [ "Apple", "Mango", "Guava", "Banana" ];

console.log( fruits.pop() );
console.log( fruits );

fruits.push( "Pear", "Grapes" );
console.log( fruits );

console.log( fruits.shift() );
console.log( fruits );

fruits.unshift( "Tomato", "Lichy" );
console.log( fruits );
console.log("\n");









//---------------> array.splice(start, deleteCount, item1, item2, ..., itemN)


/*
    - start	➜ Index at which to start changing the array
    - deleteCount ➜ Number of elements to remove from start position
    - item1...itemN ➜ Optional elements to add to the array at start position

    it modifies the original array
*/


fruits = [ "Apple", "Mango", "Guava", "Banana" ];
console.log(fruits);

//remove element
fruits.splice(1,2);
console.log(fruits);



// returns the array of removed elements
fruits = [ "Apple", "Mango", "Guava", "Banana" ];
console.log(fruits.splice(1,2));

//or

fruits = [ "Apple", "Mango", "Guava", "Banana" ];
let removed = fruits.splice(1,2);
console.log(removed);



//add elements
fruits = [ "Apple", "Mango", "Guava", "Banana" ];
fruits.splice(1, 0, "Grapes", "Pear");
console.log(fruits);


//replace elements (delete + add element at same pos)
fruits = [ "Apple", "Mango", "Guava", "Banana" ];
fruits.splice(1, 1, "Pineapple");
console.log(fruits);




// Delete everything from a point
fruits = [ "Apple", "Mango", "Guava", "Banana" ];
console.log(fruits);
fruits.splice(1);  // removes everything from index 1 onward
console.log(fruits);
console.log("\n");











//----------------> array.slice(start, end)


/*
    Use slice(start, end) to extract a portion of the array into a new array.
    It returns elements from index 'start' to 'end - 1' and does NOT modify the original array.

    start ⇒ (Optional) The index to start slicing (inclusive). Defaults to 0 if not provided.
    end	  ⇒ (Optional) The index to stop slicing (exclusive). Defaults to array.length if not provided.


*/



// 🔹 1. Basic Syntax:
let arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(1,4)); //return sliced list from index 1 to 3 : ['b', 'c', 'd']

//or

arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

sliced = arr.slice(1, 4); // from index 1 to 3
console.log(sliced); // ['b', 'c', 'd']



// 🔹 2. Slice without end (till end of array):
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);
console.log(arr.slice(2));



// 🔹 3. Slice with only start = 0 (copy full array -> not 2 references pointing to same array)
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

let copy = arr.slice(0);
console.log(copy);

copy[2] = 'z';
console.log(copy);
console.log(arr);



// 🔹 4. Using slice() with Negative Indices:
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(-3));
console.log(arr.slice(-5, -1));



// 🔹 5. Slice with start >= array.length
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(6)); //[]



// 🔹 6. Slice with start >= end
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(4,1)); //[]



// 🔹 7. Use with strings (via String.prototype.slice)
let str = "JavaScript";
console.log(str.slice(4, 10)); // "Script"



// 🔹 8. Clone an Array: not 2 references pointing to same array
arr = [ 'a', 'b', 'c', 'd', 'e'];

let clone = arr.slice();

console.log(arr);
console.log(clone);

clone[5] = 'z';
console.log(arr);
console.log(clone);



// 🔹 9. Get First n Elements:
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(0,4));



// 🔹 10. Get Last n Elements:
arr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
console.log(arr);

console.log(arr.slice(-4));
console.log("\n");











//------------------> arr.concate() method

/*
    The concat() method is used to merge two or more arrays into a new array. 
    It does not modify the original arrays.

    Returns a new array (originals are not changed).
    Can combine multiple arrays or even non-array values (like numbers, strings).
*/



// 🔹 1. Concatenate two arrays:
let a = [1, 2];
let b = [3, 4];

let result = a.concat(b);
console.log(result);



// 🔹 2. Concatenate multiple arrays:
let x = [1];
let y = [2];
let z = [3];

let all = x.concat(y,z);
console.log(all);



// 🔹 3. Concatenate array with values:
let base = [0];

let extended = base.concat(1, 2, [3, 4]);
console.log(extended);



// 🔹 4. Original array is not modified:
let original = [1,2,3];
let newArr = original.concat(4,5);

console.log(original);
console.log(newArr);



// 🔹 5. can concatenate two different type array
let numbers = [1,2,3];
let letters = ['a','b','c'];
let alphaNumeric = numbers.concat(letters);

console.log(alphaNumeric);



// 🔹 6. Nested arrays are not flattened:
let p = [1,2];
let q = [[3,4],[5]];

console.log(p.concat(q));
console.log("\n");













//-------------->  arr.forEach(fn) method : for iteration

/*
    array.forEach(function(element, index, array) {
        // code to run for each element
    });

    Or using arrow function:

    array.forEach((element, index, array) => {
        // code here
    });


    element	⇒ Current item being processed
    index   ⇒ Index of the current element (optional)
    array   ⇒ The full array (optional)

*/



// 🔸 1. Print each element:
[ "Pranav", "Atul", "Ayush", "Vagessh" ].forEach( function(item) {
    console.log(item);
} );



// 🔸 2. Using arrow function:
[ "Pranav", "Atul", "Ayush", "Vagessh" ].forEach( (item) => {
    console.log(item);
} );




// 🔸 3. Get index too:
fruits = [ "Mango", "Apple", "Guava", "Banana" ];

fruits.forEach((item,index) => {
    console.log(`${index} : ${item}`);
});




// 🔸 4. Get array too:
fruits = [ "Mango", "Apple", "Guava", "Banana" ];

fruits.forEach((item,index,array) => {
    console.log(`${item} is at index ${index} in ${array}`);
});




// 🔸 5. Sum of all numbers:
numbers = [10,20,30];
let sum = 0;

// numbers.forEach((item) => { sum += item } );
numbers.forEach(item => sum += item );

console.log(`Sum : ${sum}`);




// 🔸 6. Modify elements (won’t work as expected):
arr = [1, 2, 3];
arr.forEach(x => x = x * 2);  // ❌ This does NOT change original array
console.log(arr); // [1, 2, 3]

arr.forEach((x,i,arr) => arr[i] = x * 2);  // This change original array
console.log(arr); // [2, 4, 6]
console.log("\n");


/*

    ⚠️ Notes:
        - forEach() does not return anything. (return undefined)
        - You can’t break out of a forEach() loop using break or return.
        - Use a regular for or for...of loop if you need to break.

    ✅ When to Use forEach():
        - When you just want to perform an action on every item in an array.
        - When you don’t need a return value.
        - Perfect for logging, updating DOM, side effects.
    
    ✅ Mutates(change) Original?
        - yes, If you change array[index]
*/









//-----------> Searching in array


// 🔍 1. includes() – Does the value exist? -> Returns true or false.

fruits = ["apple", "banana", "mango", "guava", "apple"];
console.log(fruits.includes("apple"));
console.log(fruits.includes("apple", 2));
console.log(fruits.includes("grapes"));

// The includes method handles NaN correctly
arr = [NaN];
console.log( arr.indexOf(NaN) ); // -1 (not found - wrong) -> but should be 0
console.log( arr.includes(NaN) );// true (correct)
console.log();



// 🔍 2. indexOf() – Find the index of a value -> Returns the first index where the value is found. If not found, returns -1.

numbers = [10,20,30,20,30];
console.log(numbers.indexOf(10));
console.log(numbers.indexOf(20));
console.log(numbers.indexOf(30));
console.log(numbers.indexOf(20,2));
console.log(numbers.indexOf(30,3));
console.log();




// 3. lastIndexOf() – Find the last index -> Same as indexOf() but starts from the end.

numbers = [10,20,30,20,30];
console.log(numbers.lastIndexOf(10));
console.log(numbers.lastIndexOf(20));
console.log(numbers.lastIndexOf(30));
console.log();




// 🔍 4. arr.find(fn) – Find first matching element -> Returns the value of the first element that satisfies the condition.

/*
    let result = arr.find(function(item, index, array) {
        // if true is returned, item is returned and iteration is stopped
        // for falsy scenario returns undefined
    });
*/
let ages = [10, 22, 30, 18];

let adults = ages.find(function(input) {
    return input >= 18;
});
console.log(adults);

//arrow function syntax
adults = ages.find(age => age >=18);
console.log(adults);

//real time application
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

console.log(user.name); 
console.log();




// 🔍 5. findIndex() – Find index of the match - Returns the index of the first element that matches.

ages = [10, 12, 30, 18];
let i = ages.findIndex(age => age >= 18);
console.log(i);
console.log();





// 🔍 6. findLastIndex() - Returns the index of the last element that satisfies the condition.

numbers = [3, 7, 10, 15, 20, 11];
const lastIndexAbove10 = numbers.findLastIndex(num => num > 10);
console.log(lastIndexAbove10);

//real world example

users = [
  { name: "Ayush", age: 17 },
  { name: "Riya", age: 21 },
  { name: "Pranav", age: 25 },
  { name: "Riya", age: 26 }
];

const firstRiya =users.find(item => item.name === "Riya");
console.log(firstRiya);  // { name: "Riya", age: 21 }

const firstRiyaIndex = users.findIndex(item => item.name === "Riya");
console.log(firstRiyaIndex); // 1

const lastRiyaIndex = users.findLastIndex(item => item.name === "Riya");
console.log(lastRiyaIndex); // 3
console.log("\n");





// 🔍 7. arr.filter(fn) - Returns a new array containing all elements that match a condition.

/*
    let results = arr.filter(function(item, index, array) {
        // if true item is pushed to results and the iteration continues
        // returns empty array if nothing found
    });
*/



// 🔸 Example 1: Filter numbers greater than 10

numbers = [5, 10, 15, 20, 3, 25, 1];
result = numbers.filter(num => num > 10);
console.log(result);



// 🔸 Example 2: Filter even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 16];
const even = numbers.filter(n => n % 2 === 0);
console.log(even);


// ✅ Real-World Examples



// 🔸 Example 4: Filter adults from an array of people

const people = [
    { name : "Ayush", age : 18 },
    { name : "Shobhit", age : 14 },
    { name : "Vageesh", age : 8 },
    { name : "Pranav", age : 28 },
];
adults = people.filter(person => person.age >= 18);
console.log(adults);




// 🔸 Example 5: Filter even-indexed elements

const items = ["a", "b", "c", "d", "e"];
const evenIndexed = items.filter((item, index) => index % 2 === 0);
console.log(evenIndexed); 




// 🔸 Example 6: Remove falsy values from array

arr = ["pranav", false, 6162, null, "", 'p', undefined, '0', "false", true];
const truthyValues1 = arr.filter(item => Boolean(item));
console.log(truthyValues1);

const truthyValues2 = arr.filter(Boolean); // shorthand of above : can use any callback fn in this way
console.log(truthyValues2);
console.log("\n");










//------------------> Transform an array




//-----> 1. arr.map(fn) Method in JavaScript


/*
    The .map() method creates a new array by applying a function to each element of the original array.
        - It does not change the original array
        - It returns a new array of the same length

    let result = arr.map(function(item, index, array) {
        // returns the new value instead of item
    });

    let result = array.map((item, index, array) => {
        // return new value instead of item
    });
            
*/


let words = [ "Apple", "Walk", "Cycle", "Buffalo" ];
let length = words.map(item => item.length);
console.log(length);




// 1️⃣ Convert temperatures from Celsius to Fahrenheit
let celcius = [0, 10.3, 20, 30];
let Fahrenheit = celcius.map(c => (c * 9) / 5 + 32);
console.log(Fahrenheit);



// 2️⃣ Extract names from array of objects
users = [
    { name : "Pranav", age : 12 },
    { name : "Mirza", age : 22 },
    { name : "Ashutosh", age : 45 },
    { name : "Alok", age : 2 },
    { name : "Maverick", age : 46 },
];

let names = users.map(item => item.name);
console.log(names);




// 3️⃣ Add index to each element
words = [ "Apple", "Walk", "Cycle", "Buffalo" ];
let withIndex = words.map((word, index) => `${index} : ${word}`);
console.log(withIndex);



// 4️⃣  Boolean transformation
let mixed  = ["pranav", 6162, null, "", undefined, "false"];
let booleanTable = mixed.map(Boolean); //shorthand for : item => Boolean(item) ----> can use for callback fns only 
console.log(booleanTable);
console.log("\n");









//-----> 2. arr.sort(fn) Method in JavaScript


/*
    The sort() method sorts the elements of an array in place and returns the same array, now sorted.

        - sort() modifies original array.
        - sort() also return sorted array, you can log it or store in a variable
        - The sort() method arranges array elements in order.
        - By default, it sorts as strings in alphabetical (UTF-16) order.
        - To sort numbers correctly, we pass a compare function:
        - (a, b) => a - b for ascending, (a, b) => b - a for descending.

*/
       

       
// 📌 1. Sort Strings Alphabetically

fruits = [ "pear", "banana", "apple", "guava" ];
console.log(fruits);

// console.log(fruits.sort());
fruits.sort();
console.log(fruits);




// 📌 2. Sort Numbers (❌ Incorrect without compare function)

numbers = [112, 34, 12 , 39, 100];
console.log(numbers);

numbers.sort();
console.log(numbers);




// ✅ 3. Sort Numbers (✔️ Correct with compare function)

numbers = [112, 34, 12 , 39, 100];
console.log(numbers);

//ascending
numbers.sort((a,b) => a - b);
console.log(numbers);

//descending
numbers.sort((a,b) => b - a);
console.log(numbers);




/*
⚙️ Behind the Scenes: How sort(a, b) Works

JavaScript’s .sort(compareFn) doesn’t care how you compute the number — it only looks at:

        | Return Value from `compareFn(a, b)` | What `.sort()` does        |
        |-------------------------------------|----------------------------|
        |     < 0 (negative)                  |   Keeps a  before b        |
        |     > 0 (positive)                  |   Puts  a after b          |
        |     === 0                           |   Keeps the order the same |

        So yes — the logic is driven by the sign of the return value.
        
        

    🧠 Why Two Subtraction Forms?

        a - b returns:
            → Negative when a < b → Good for ascending
            → Positive when a > b → So a goes after b

        b - a flips it:
            → Negative when b < a → Good for descending
            → Positive when b > a → So a goes after b
        
        👉 So we don’t care about subtraction itself — we care about what sign it gives:
            Want ascending?  Use a - b
            Want descending? Use b - a
        
*/
       
       
       
       
       
       
// 📌 4. Sort Strings Case-Insensitive

names = [ "Pranav", "Zeeshan", "alok", "Vageesh", "mirza" ]; //first letter is small by purpose
console.log(names);

names.sort()
console.log(names); //Why weird order? Because JavaScript compares characters by their Unicode values, and: Capital letters (A–Z) come before lowercase (a–z)

names.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(names);




// 📌 5. Sort Array of Objects by Property

users = [
    { name : "Pranav", age : 36 },
    { name : "Zeeshan", age : 8 },
    { name : "Alok", age : 20 },
    { name : "Vageesh", age : 1 },
    { name : "Mirza", age : 34 },
];
console.log(users);

// 🔼 Sort by age ascending:
users.sort((a,b) => a.age - b.age);
console.log(users);


// 🔽 Sort by name descending:
users.sort((a,b) => b.name.localeCompare(a.name));
console.log(users);






// 📌 6. Sort by String Length

words = ["apple", "pie", "banana", "kiwi"];
console.log(words);

words.sort((a, b) => a.length - b.length);
console.log(words);







// 📌 7. Custom Sort – Even Numbers First
numbers = [3,6,1,100,18];
console.log(numbers);

numbers.sort((a,b) => {
    // If 'a' is even and 'b' is odd → return negative means 'a' should come before 'b'
    if (a % 2 === 0 && b % 2 !== 0 ) return -1;

    // If 'a' is odd and 'b' is even → return positive 'a' should come after 'b'
    if (a % 2 !== 0 && b % 2 === 0 ) return 1;
    
    // Otherwise (both even or both odd), sort them in ascending order
    return a - b;
});
console.log(numbers);







// 🧪 Bonus: Sort and Chain with map()

let prices = [10.567, 2, 29.2, 15.12];
console.log(prices);

let formatted = prices.sort((a,b) => a-b);
console.log(formatted); // [ 2, 10.567, 15.12, 29.2 ]

formatted = prices.sort((a,b) => a-b).map(item => `$${item.toFixed(2)}`);
console.log(formatted); // [ '$2.00', '$10.57', '$15.12', '$29.20' ]
console.log("\n");











//---------------------> 3. arr.reverse() Method in JavaScript

/*
    ✅ What it does:
        - Reverses the order of elements in an array.
        - return reverse of arr, can log on screen or store in another var
        - Modifies the original array in place (⚠️ destructive).
        - Returns the same array, now reversed.
*/



// 📌 1. Basic Example

arr = [1,2,3,4,5,6];
console.log(arr);

arr.reverse();
console.log(arr);




// 📌 2. Reverse a String (Convert to array first)

str = "hello";
console.log(str);

let reversedStr = str.split('').reverse().join('');
console.log(reversedStr); // "olleh"





// 📌 3. Reverse an array of strings

fruits = ["apple", "banana", "cherry"];
console.log(fruits);

fruits.reverse();
console.log(fruits); // ["cherry", "banana", "apple"]





// 📌 4. Reverse array of objects (latest → oldest)

let messages = [
    { id: 1, text: "Hi" },
    { id: 2, text: "Hello" },
    { id: 3, text: "Hey" },
];
console.log(messages);

messages.reverse();
console.log(messages);
// [
//   { id: 3, text: "Hey" },
//   { id: 2, text: "Hello" },
//   { id: 1, text: "Hi" }
// ]





// 📌 5. Reverse a copied array (✅ without changing original) ⭐⭐⭐

original = [10, 20, 30];
console.log(original);

let reversed = [...original].reverse();

console.log(original); // [10, 20, 30]
console.log(reversed); // [30, 20, 10]






// 📌 6. Reverse Nested Arrays

let nested = [[1, 2], [3, 4], [5, 6]];
console.log(nested);

nested.reverse();
console.log(nested); // [[5, 6], [3, 4], [1, 2]]
console.log("\n");










//--------------> 4. str.split(separator, limit) method of string & array.join(separator) method of array


/*
    🔹 split() : String → Array , Converts a string into an array, splitting it at each separator (delimiter).
        - separator: character(s) to split by (like " ", ",", "", etc.)
        - limit (optional): max number of splits

    🔹 join() : Array → String , Joins array elements into a single string with a separator. 
        - separator: optional, defaults to "," if not given.
*/


// we have studied split() method in string chapter

// 1. Split email into username and domain

let email = "pranavsingh@gmail.com";
console.log(email);

let parts = email.split("@");
console.log(parts);



// 📌 Examples of join()


// 1. Join with default separator

arr = [ "red", "green", "blue" ];
console.log(arr);

console.log(arr.join());




// 2. Join with space
words = ["JavaScript", "is", "fun"];
console.log(words);

console.log(words.join(" "));




// 3. Join with hyphen

words = ["JavaScript", "is", "fun"];
console.log(words);

console.log(words.join("-"));
console.log("\n");





//  📌  Combine Both: string and arr method



// 1. Reverse a string

str = "pranav";
console.log(str);

console.log(str.split("").reverse().join(""));






// 2. Reverse a Sentence

sentence = "I am Pranav";
console.log(sentence);

console.log(sentence.split(" ").reverse().join(" "));





// 3. Reverse Each Word in a Sentence

sentence = "your bro Pranav";
console.log(sentence);

// let reversedWord = sentence.split(" ").map(item => item.split("").reverse().join("")).join(" ");

let reversedWord = sentence
.split(" ")
.map(item => item.split("").reverse().join(""))
.join(" ");
console.log(reversedWord);


/*-------> step by step for better understanding

result = sentence.split(" ");
console.log(result);

result = result.map(item => item.split(""));
console.log(result);

result = result.map(item => item.reverse());
console.log(result);

result = result.map(item => item.join(""));
console.log(result);

result = result.join(" ");
console.log(result);
*/






// 4. Check if a String is a Palindrome

str = "madam";
let isPalindrome = str === str.split("").reverse().join("")
console.log(isPalindrome);




// 5. Count Words in a Sentence

sentence = "     I am        Pranav           ";

// let wordCount = sentence.trim().split(" ").length; // will cause problem in string like "I am              Pranav"

let wordCount = sentence.trim().split(/\s+/).length;
console.log(wordCount);

/*

|    Part   |               Meaning                                                   |
|-----------|-------------------------------------------------------------------------|
|   /.../   |   Delimiters for a regex in JavaScript(all regEx are wriiten within it  |
|   \s      |   Matches any whitespace character: space, tab, newline, etc.           |
|   +       |   Means "1 or more of the thing before it" (in this case, whitespace)   |

*/





// 6. Replace spaces with hyphens (Slugify a string)

str = "Learn Javascript With Pranav";
console.log(str);

// let slug = str.toLowerCase().trim().split(/\s+/).join("-");

let slug = str
.toLowerCase()
.trim()
.split(/\s+/)
.join("-");
console.log(slug);





//  7. Find Length of Each Word

sentence = "     I am        Pranav           ";
console.log(sentence);

length = sentence.trim().split(/\s+/).map(item => item.length);
console.log(length);
console.log("\n");











//--------------> 5. reduce(fn)/reduceRight(fn) method of array


/*
🧠 1. What do .reduce() and .reduceRight() do?

    .reduce():
        It reduces the entire array to a single value (like a number, string, object, or array) by applying a function to each element one-by-one from left to right.
    
    .reduceRight():
        It does the same as reduce(), but processes elements from right to left.



🎯 2. Why/When should you use them?

    ✅ Use .reduce() when:
        - You want to summarize data from an array.
        - You want to build something from all items (like a sum, object, string, etc.).
        - You want to avoid loops and write cleaner logic.

    ✅ Use .reduceRight() when:
        - You want to build data in reverse order.
        - You need right-to-left processing like in math (e.g., a - (b - c)).
        - You want to reverse a structure manually.



🧩 3. Syntax & Explanation
    

    🔹 .reduce() Syntax:
            let value = arr.reduce(function(accumulator, item, index, array) {
                // your code logic here
            }, [initial]);

        accumulator  ⇒  is the result of the previous function call, equals initial the first time (if initial is provided).
        item         ⇒  is the current array item.
        index        ⇒  is its position.
        array        ⇒  is the array.
        

            let value = arr.reduce((accumulator, currentValue, index, array) => {
                // your code logic here
            }, initialValue);

        accumulator	      ⇒  Stores the result of the previous computation
        currentValue	  ⇒  Current element being processed
        index (Optional)  ⇒  Index of the current element
        array (Optional)  ⇒  The array being processed
        initialValue	  ⇒  (Optional but recommended) Initial value for acc



    🔹 .reduceRight() Syntax:
            arr.reduceRight((acc, val) => {
                // logic
            }, initialValue);

        Same as reduce(), but works right-to-left.

*/




// 1.  Basic: Sum of all numbers (reduce)

arr = [1, 2, 3, 4, 5];
console.log(arr);

result = arr.reduce((sum, current) => sum + current, 0);
console.log(result);


// The result is the same. That’s because if there’s no initial, then reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element.
arr = [1, 2, 3, 4, 5];
console.log(arr);

result = arr.reduce((sum, current) => sum + current);
console.log(result);


// But such use requires an extreme care. If the array is empty, then reduce call without initial value gives an error.
arr = [];
// result = arr.reduce((sum, current) => sum + current); //TypeError: Reduce of empty array with no initial value





// 2. Multiply all elements (reduce)

arr = [6, 2, 3, 1];
console.log(arr);

result = arr.reduce((mul, current) => mul * current, 1);
console.log(result);




// 3. Find maximum number (reduce)

arr = [6, 2, 3, 1];
console.log(arr);

result = arr.reduce((max, current) => (max > current) ? max : current, Number.MIN_VALUE);
console.log(result);

result = arr.reduce((max, current) => (max > current) ? max : current);
console.log(result);




// 4. Convert array to frequency object (reduce) ⭐⭐⭐
fruits = ["apple", "banana", "apple", "grapes", "peer", "banana", "orange", "banana"];
console.log(fruits);

result = fruits.reduce((acc, fruit) => {
    acc[fruit] = ( acc[fruit] || 0 ) + 1;
    // acc[fruit] = acc[fruit] ? acc[fruit] + 1 : 1;
    return acc;
}, {});

console.log(result);


/*--------------> 🔍 Step-by-Step Explanation:

    🧠 reduce() method:
        reduce() loops through the array and builds up a single final value (in this case, an object).
        
        - acc   : short for accumulator – it stores the result as we go.
        - fruit : the current item in the array.
        - {}    : initial value of acc, an empty object.


    🔓 What does (acc[fruit] || 0) + 1 do?
        This is a smart trick:
            - If the fruit doesn't exist in the object yet(undefined) → use 0
            - If it does exist → get the current count
            - Then add 1

*/


/* 
    🌟 What does this reduce() code do?

        Goal : Convert an array like ["apple", "banana", "apple"] into an object that shows how many times
        each fruit appears:
            👉 { apple: 2, banana: 1 }

        We're using the reduce() method to do this.



    🧠 How reduce() works here:

        Syntax:
            array.reduce((accumulator, currentValue) => { ... }, initialValue);

        In our case:
            - accumulator (acc): this will become the final result object.
            - currentValue (fruit): each fruit from the array.
            - initialValue: we start with an empty object `{}`.



    🔍 Step-by-step with Example:

        let fruits = ["apple", "banana", "apple"];

        👉 Step 1:
            acc = {}
            fruit = "apple"
            acc["apple"] = (acc["apple"] || 0) + 1
                         = (undefined || 0) + 1 → 1
            acc becomes { apple: 1 }

        👉 Step 2:
            fruit = "banana"
            acc["banana"] = (acc["banana"] || 0) + 1
                          = (undefined || 0) + 1 → 1
            acc becomes { apple: 1, banana: 1 }

        👉 Step 3:
            fruit = "apple"
            acc["apple"] = (acc["apple"] || 0) + 1
                         = (1 || 0) + 1 → 2
            acc becomes { apple: 2, banana: 1 }



    🧠 Why (acc[fruit] || 0) + 1 works:

        - If acc[fruit] is undefined (fruit not counted yet), use 0 → first time adding it.
        - If acc[fruit] already has a value, add 1 to update its count.
        - This way, we count each fruit accurately.



    🔚 At the end of reduce, we return the final object as 'result':
        { apple: 2, banana: 1 }



    ✅ This pattern is very useful for frequency counting from arrays.

*/







// 4. Flatten an array (reduce)

nested = [[1,2], [3,4], [5,6]];
console.log(nested);

let flat = nested.reduce((acc, subArr) => acc.concat(subArr), [])
console.log(flat);





// 5. Build a string from characters (reduce)

arr = ["p", "r", "a", "n", "a", "v"];
console.log(arr);

result = arr.reduce((acc, char) => acc + char, "I am ");
console.log(result);








// 6. Count truthy values (reduce)

values = [true, false, "hi", 0, null];
console.log(values);

// count = values.reduce((acc, value) => acc + Boolean(value) ? 1 : 0, 0);
// console.log(count);

/*
    ❌ Problem:

        👉 count = values.reduce((acc, value) => acc + Boolean(value) ? 1 : 0, 0);

        Because of operator precedence, this is actually interpreted as:

        👉 count = values.reduce((acc, value) => (acc + Boolean(value)) ? 1 : 0, 0);

        Which means every time it adds Boolean(value) to acc, then checks if the result is truthy, 
        and always returns 1 or 0, losing the actual accumulated count.

*/

// count = values.reduce((acc, value) => (Boolean(value) ? acc + 1 : acc), 0);
count = values.reduce((acc, value) => acc + (Boolean(value) ? 1 : 0), 0)
console.log(count);

count = values.reduce((acc, value) => acc + !!value, 0); //shortcut of above code
console.log(count);






// 7. Sum and count of array elements(reduce)

arr = [100, 20, 40];
console.log(arr);

// Method-01
result = arr.reduce((acc, value) => {
    acc["Total"] = (acc["Total"] || 0) + value;
    acc["Count"] = (acc["Count"] || 0) + 1;
    return acc;
}, {});

console.log(result);


// Method-02
result = arr.reduce((acc, value) => {
    acc.Total = (acc.Total || 0) + value;
    acc.Count = (acc.Count || 0) + 1;
    return acc;
}, {});

console.log(result);


// Method-03
result = arr.reduce((acc, value) => {
    acc.total += value;
    acc.count++;
    return acc;
}, { total: 0, count: 0 });
console.log(result);




// Method-04
result = arr.reduce((acc, value) => ({
    total: acc.total + value,
    count: acc.count + 1
}), { total: 0, count: 0 });

console.log(result);


/*--------> For understanding 

    arr = [100, 20, 40];
    console.log(arr);

    const initialValue = {
      total: 0,
      count: 0
    };

    res = arr.reduce(
    (obj, curr) => {

    obj.total = obj.total + curr;
      obj.count = obj.count + 1;

    console.log(obj)

    return obj;

    }, initialValue);

    console.log(res);


    -------------> Output
    
    [ 100, 20, 40 ]
    { total: 100, count: 1 }
    { total: 120, count: 2 }
    { total: 160, count: 3 }
    { total: 160, count: 3 }

*/


// Method-05
result = arr.reduce(({ Total = 0, Count = 0 }, value) => ({ Total: Total + value, Count: Count + 1 }), {});
console.log(result);
console.log("\n");


/*
    ⚠️ Important: When using arrow functions and returning an object directly,
        - you MUST wrap the object in parentheses like this: ({ key: value })
        - Otherwise, JavaScript will think you're writing a function body, not an objec   
    
    ❌ Wrong (interpreted as function block with a label, not an object):
        { Total: Total + value, Count: Count + 1 }
    
    ✅ Correct (wrapped in parentheses, so it's returned as an object):
        ({ Total: Total + value, Count: Count + 1 })

    🎯 Rule of Thumb: Always use ( ... ) when returning an object from an arrow function.

*/













//----------------> Array.isArray(value)

/*
    Array.isArray(value) is a static method used to check whether a value is an array or not.

    It returns:
        true → if the value is an array
        false → if the value is not an array
    
    "typeof" operator does not help to distinguish a plain object from an array:
*/

console.log(typeof []); // object
console.log(typeof {}); // object


console.log( Array.isArray([]) ); // true
console.log( Array.isArray({}) ); // false

console.log( Array.isArray( [[1,2], [3,4]] ) ); //true
console.log("\n");







//---------> most methods support "thisArg" : read yourself 

