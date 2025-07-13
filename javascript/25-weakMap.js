//-------------> Need of WeakMap


/*
    As we know from the chapter Garbage collection, JavaScript engine keeps a 
    value in memory while it is “reachable” and can potentially be used.
*/


let john = { name : "John" };

// the object can be accessed, john is the reference to it
console.log(john);

// overwrite the reference
john = null;

// the object will be removed from memory
console.log(john);


/*
    Usually, properties of an object or elements of an array or another data structure are 
    considered reachable and kept in memory while that data structure is in memory.

    For instance, if we put an object into an array, then while the array is alive, 
    the object will be alive as well, even if there are no other references to it.

    Like this:
*/

john = { name : "John" };
let arr = [ john ];

john = null; //overwrite the references

/*
    the object previously referenced by john is stored inside the array
    therefore it won't be garbage-collected
    we can get it as arr[0]
    */
   
   
   /*
   Similar to that, if we use an object as the key in a regular Map, 
   then while the Map exists, that object exists as well. 
   It occupies memory and may not be garbage collected.
   
   For instance:
*/

john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

/*
    john is stored inside the map,
    therefore it won't be garbage-collected
    we can get it by using map.keys()

    WeakMap is fundamentally different in this aspect. 
    It doesn’t prevent garbage-collection of key objects.
*/

console.log("\n");








//------------------> WeakMap


/*
    A WeakMap is a special kind of Map in JavaScript where:
        - Keys must be objects (not primitives).
        - Keys are weakly held, meaning they do not prevent garbage collection if the object becomes unreachable elsewhere.
        - It’s used for private data, caching, and memory-sensitive storage.


    🧠 Why "Weak"?
        Because:
        - The reference to the object key is weak, not strong.
        - If there are no other references to the key object, it can be garbage collected, even if it’s still in the WeakMap.


    🔧 Syntax

        let wm = new WeakMap();

        wm.set(obj, value);
        wm.get(obj);
        wm.has(obj);
        wm.delete(obj);
    
    
    🔒 Key Restrictions
        - only object keys are allowed
        - not itersble (no for..of, etc)
        - .size property not available

*/


// Primitive keys are not allowed

let weakMap = new WeakMap();
let obj = {};

weakMap.set(obj, "setting obj as key"); // works fine obj as key

// wm.set("name", "pranav"); // Error : Invalid value used as weak map key (because "name" is not obj)







/*
    Now, if we use an object as the key in it, and there are no other references to that object 
    – it will be removed from memory (and from the map) automatically.
*/


john = { name : "John" };

weakMap = new WeakMap();
weakMap.set(john, "value");

console.log(weakMap); // Output : WeakMap { <items unknown> }

/*
    You won’t see the contents of the WeakMap in the console like you do with a normal Map.

    ❓ Why?
        - WeakMap is not iterable and is designed to hide its internal structure for memory safety.
        - You can't inspect or list its keys/values like in Map.

    ✅ You Can Still Access Values:
        console.log(weakMap.get(john)); // Output: "value"

    🔥 Important:
        If you do: john = null;
            Then the object becomes eligible for garbage collection, 
            and the entry in WeakMap will automatically be removed.
*/

console.log(weakMap.get(john));


john = null; // overwrite the reference

// john is removed from memory!
console.log(weakMap.get(john));  // Output : undefined
console.log("\n");








/*
    WeakMap does not support iteration and methods keys(), values(), entries()
    so there’s no way to get all keys or values from it.

    WeakMap has only the following methods:
        - weakMap.set(key, value)
        - weakMap.get(key)
        - weakMap.delete(key)
        - weakMap.has(key) 


    Why such a limitation ?
        Because JavaScript doesn't know exactly when the object is removed (that’s up to the engine).
            - It might delete now.
            - It might delete after some time.
            - It might even keep it a bit longer in memory (just in case).

        So showing .size or .keys() would give you wrong or half-cleaned data, which is not safe.
*/







//----------> Use Case of WeakMap: additional data (Extra Data for Temporary Objects)


/*
    Sometimes in coding, you're using objects that come from other libraries or parts of your app.

    But you want to attach extra info to those objects — like tracking something 
    (e.g., how many times a user visited your page).
*/




// ❌ Problem With Map


// If you use a normal Map like this:
let visitsCountMap = new Map();

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// Then later you do:
john = { name: "John" };
countUser(john);
console.log(visitsCountMap); // Map(1) { { name: 'John' } => 1 }

countUser(john);
countUser(john);
console.log(visitsCountMap); // Map(1) { { name: 'John' } => 3 }

// Now remove user
john = null;

console.log(visitsCountMap); // Map(1) { { name: 'John' } => 3 }

/*
    Even after removing john, the data is not deleted from Map.
    Why? Because the Map still holds a reference to john.

    🚨 That means john is not garbage collected, and the memory is still used.
*/



// ✅ Solution: Use WeakMap

visitsCountMap = new WeakMap();

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// Now when you do:
john = { name: "John" };

countUser(john);
console.log(visitsCountMap.get(john)); //1

countUser(john);
countUser(john);
console.log(visitsCountMap.get(john)); //3

// remove john
john = null;

console.log(visitsCountMap.get(john)); //undefined
console.log("\n");

/*
    The john object is automatically deleted from memory,
    and the visit count inside the WeakMap is also deleted — no manual cleanup needed.

    🔥 In One Line:
        WeakMap is useful when you want to attach temporary secret data to an object, 
        and let JavaScript automatically delete that data when the object is gone.

    🕵️ Simple Analogy:
        Imagine giving a person a passcode on a sticky note.
        If the person disappears, the sticky note is destroyed too — no need to track it yourself!
*/










//------------> Use case: caching


/*
    🧠 What is Caching?
        Caching means saving the result of a time-consuming task 
        so you can reuse it later instead of repeating the same task.

    Like:
        - You searched "Weather in Delhi" once.
        - Your app stores the result.
        - Next time, it shows the saved result instantly!
*/



// ❌ Problem Using Map for Caching


// We’re creating a Map to cache results for objects
let cache = new Map();

// This function simulates a result calculation
function calculateResult(obj) {
  console.log("Calculating result for", obj);
  return Object.keys(obj).length; // Count the number of keys in the object
}

// This function returns a cached result for an object
function process(obj) {
  // If result not already cached, calculate and store it
  if (!cache.has(obj)) {
    let result = calculateResult(obj);
    cache.set(obj, result);
  }
  // Return the cached result
  return cache.get(obj);
}

let myObj = { name: "Alice", age: 25 };

// First time: Calculates and saves in cache
process(myObj);
console.log(cache); // Map now holds myObj as a key

// Second time: Gets from cache without recalculating
process(myObj);
console.log(cache);

// Now we remove our only reference to myObj
myObj = null;

// ❌ But Map still remembers the original object in cache
console.log(cache);

/*
    🧠 Explanation:
        - Even though we deleted `myObj`, it is still in the cache.
        - The Map stores strong references to keys.
        - That means the object can’t be garbage-collected.
        - So memory usage keeps growing unless we manually delete entries.

        ✅ Solution: Use WeakMap when you want automatic cleanup 
        when the object is no longer used elsewhere in the code.
*/




// ✅ Solution: Use WeakMap for Caching When Keys Are Objects



// WeakMap will automatically remove keys (objects) 
// when they are no longer referenced anywhere else
cache = new WeakMap();

// This function simulates a result calculation
function calculateResult(obj) {
  console.log("Calculating result for", obj);
  return Object.keys(obj).length; // Count the number of keys
}

// This function returns a cached result for an object
function process(obj) {
  // If result not already cached, calculate and store it
  if (!cache.has(obj)) {
    let result = calculateResult(obj);
    cache.set(obj, result);
  }
  // Return the cached result
  return cache.get(obj);
}

myObj = { name: "Alice", age: 25 };

// First call: result is calculated and cached
process(myObj);
console.log(cache.get(myObj));


// Second call: result is reused from cache
process(myObj);
console.log(cache.get(myObj));

// Now remove the object reference
myObj = null;
console.log(cache.get(myObj));

// ❗ We can't check size or keys in WeakMap like Map
// But once myObj is no longer used, its data will be removed from memory automatically

/*
    🧠 Explanation:
        - WeakMap allows objects as keys, just like Map.
        - But it does NOT prevent garbage collection.
        - So if an object has no other references, it gets removed from WeakMap too.
        - Perfect for storing temporary or private metadata about objects.

    🚫 Limitations of WeakMap:
        - No .size, .keys(), .values(), or iteration
        - Only use it when your keys are objects and you don’t need to list the content
*/

