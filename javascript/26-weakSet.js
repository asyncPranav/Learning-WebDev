/*
    🧠 What is WeakSet?
        - Just like Set, but it only stores objects (not strings, numbers, etc.)
        - It remembers whether an object is added or not — just a yes/no check.
        - If the object is removed elsewhere, WeakSet automatically forgets it — ✅ no memory leak.
        - It is called "weak" because it does not prevent garbage collection of the object.


    ✅ Key Features of WeakSet:
        - only objects as values (can't add primitves)
        - cant use .size 
        - no iteration (can't use for..of, .keys etc)
        - method supported (.add(obj), .has(obj), .delete(obj))
        - auto cleanup (Objects are removed if not referenced elsewhere)
*/






//--------> Use Case: Track Users Who Visited

// Create a WeakSet to track visited users
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// Mark users as visited
visitedSet.add(john); // John visited
visitedSet.add(pete); // Pete visited
visitedSet.add(john); // John again (no duplicate)

// ✅ Check if user has visited
console.log(visitedSet.has(john)); // true
console.log(visitedSet.has(mary)); // false

// Now we delete the only reference to John
john = null;

// ⚠️ John will be automatically removed from WeakSet
// because no other variable refers to him


