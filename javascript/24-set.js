//---------> Set in javascript

/*
    📦 Definition :

        A Set is a built-in JavaScript object that stores unique values of any type — primitives or object references.

        A Set is a special type collection – “set of values” (without keys), where each value may occur only once.


    🧠 Key Features of Set:
        - Stores only unique values
        - Maintains insertion order
        - Type of value (string, number, object, etc.)


    🔧 Syntax

        new Set([iterable])    –>    creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
        
        set.add(value);      ->    Add value, returns the set itself.
        set.delete(value);   ->    Remove value, returns true if value existed at the moment of the call, otherwise false.
        set.has(value);      ->    Check existence, returns true if the value exists in the set, otherwise false.
        set.clear();         ->    Remove all elements, clear set
        set.size;            ->    Get elements count

*/


/*
    The main feature is that repeated calls of set.add(value) with the same value don’t do anything. 
    That’s the reason why each value appears in a Set only once.

    For example, we have visitors coming, and we’d like to remember everyone. 
    But repeated visits should not lead to duplicates. A visitor must be “counted” only once.
*/

let set = new Set();
console.log(set);

let john = { name : "John" };
let peter = { name : "Peter" };
let bob = { name : "Bob" };

// visits, some users come multiple times
set.add(john);
set.add(peter);
set.add(bob);
set.add(peter);
set.add(john);

// set keeps only unique values
console.log( set.size ); 

//print set
console.log(set);
console.log("\n");










//----------------> Creating a Set : Duplicates are automatically removed.

set = new Set([1, 2, 3, 2, 1]);
console.log(set);
console.log(set.keys());
console.log(set.values());
console.log(set.entries());
console.log("\n");







//-------------> Ways of creating a set


// Method-01
set = new Set();
set.add(1);
set.add(2);
set.add(3);
console.log(set);


// Method-02
set = new Set([1,2,3]);
console.log(set);


// Method-03
let arr = [1,2,3];
set = new Set(arr);
console.log(set);
console.log("\n");











//------------------> Iteration over set


// 🔄 1. Iterating using for...of

set = new Set(["a", "b", "c", "d"]);
console.log(set);


for (let value of set) {
    console.log(value);
}


// 🔄 2. Using forEach()
set = new Set(["x", "y", "z"]);
console.log(set);

set.forEach((item) => console.log(item));

set.forEach((value, key) => console.log(`Key: ${key}, Value: ${value}`));


/*
    set.forEach( function(value, key, set) {
        //your code here
    } );
    
        - Set's forEach works similarly to arrays.
        - Unlike Map, both parameters value and key are the same. we can rewrite syntax as
    
    set.forEach( function(value, valueAgain, set) {
        //your code here
    } );

    Note the funny thing. The callback function passed in forEach has 3 arguments: 
    a value, then the same value valueAgain, and then the target object. 
    Indeed, the same value appears in the arguments twice.

    That’s for compatibility with Map where the callback passed forEach has three arguments. 
    Looks a bit strange, for sure. But this may help to replace Map with Set in certain cases 
    with ease, and vice versa.

    The same methods Map has for iterators are also supported:

    set.keys() – returns an iterable object for values,
    set.values() – same as set.keys(), for compatibility with Map,
    set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.
*/




// 🔍 3. Iterating with .values() / .keys()
set = new Set(["p", "q", "r"]);
console.log(set);

for (let val of set.values()) {
  console.log(val);
}

for (let key of set.keys()) {
  console.log(key);
}






//--------------> All Practical Examples of Set



// ✅ 1. Removing duplicates from an array

arr = [1,2,3,4,5,2,1,3,2,1];
let result = new Set(arr)
console.log(result);
console.log();



// ✅ 2. Checking if a value exists

set = new Set(["apple", "banana"]);
console.log(set.has("banana"));
console.log(set.has("guava"));
console.log();




// ✅ 3. Converting Set to Array

set = new Set(["x", "y", "z"]);
arr = Array.from(set);
console.log(arr);
console.log("\n");




// ✅ 4. Finding intersection of two arrays

let a = [1,2,3,4];
let b = [3,4,5,6];

let setA = new Set(a);
let common = b.filter((item) => setA.has(item));
console.log(common);
console.log();




// ✅ 5. Finding union of two arrays

a = [1,2,3,4];
b = [3,4,5,6];

setA = new Set(a);

// let union = b.filter((item) => !setA.has(item)).concat(a); // output : [5,6,1,2,3,4] (partially wrong)

// let union = a.concat( b.filter((item) => !setA.has(item)) ); // output : [1,2,3,4,5,6] (correct)

// let union = Array.from( new Set([...a, ...b]) ); // output : [1,2,3,4,5,6] (correct)

let union = [ ...new Set([...a, ...b]) ]; // output : [1,2,3,4,5,6] (correct)

console.log(union);
console.log();






// ✅ 6. Set size vs Array length

arr = [1, 2, 2, 3];
set = new Set(arr);

console.log(arr.length); // 4
console.log(set.size);   // 3
