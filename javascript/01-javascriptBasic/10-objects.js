// -----> way of creating empty object

let user = new Object();
let admin = {};
console.log(user);
console.log(admin);
console.log("\n");






//-------> Obect with properties

user = {
    name : "Pranav",
    age : 20,
    adress : "Hardoi"
};
console.log(user);
console.log("\n");







//-------> Obect with properties
user = {
    name : "Pranav",
    age : 20,
    adress : "Hardoi",
    "like birds" : true, //Multiword property must be quoted
    rollNo : 32, // last property may end with comma too
};
console.log(user);
console.log(user.name);
console.log(user.age);
console.log(user.adress);
//console.log(user."like birds"); // cant access multi word key using dot
console.log("\n");








//-------> Add property to the object

user.isAdmin = true;
console.log(user);
console.log("\n");







//-------> Delete property of object
delete user.adress;
console.log(user);
console.log("\n");







//-------> set, get, delete multi word property
user["love tea"] = true;
console.log(user);

console.log(user["love tea"]);

delete user["love tea"];
console.log("\n");






//-------> [] also provide way to get property using variable name
key = "age";
console.log(user.key); // looks for user["key"] (a property named "key") - undefined
console.log(user[key]); // looks for user["age"] (because key = "age") - 20
console.log("\n");






//--------> Computed properties
let fruit = "apple";
let bag = {
    banana : 20,
    [fruit] : 30,
    [fruit + "Computers"] : 40
};
console.log(bag);
console.log("\n");










//------->obj can't have two same property, later one will prevail
let obj = {
    key1 : "value1",
    key2 : "value2",
    key1 : "value3"
};
console.log(obj); // { key1: 'value3', key2: 'value2' }
console.log("\n");










//------->spread operator in obj
let obj1 = {
    key1 : "value1",
    key2 : "value2",
};

let obj2 = {
    key3 : "value3",
    key4 : "value4",
};

let newCloneObj = {...obj1, ...obj2, key5 : "value5"};
console.log(newCloneObj);
console.log();

let newSpreadObj = { ..."abc" };
console.log(newSpreadObj);

newSpreadObj = { ...["item1", "item2", "item3"] };
console.log(newSpreadObj);
console.log("\n");











//-----------> Object destructuring : read from obsidian

let band = {
    bandName : "led zepplin",
    famousSong : "stairway to heaven",
    year : 1968,
    location : "USA",
};

//if we want to keep different variable name then
let { bandName:var1 , famousSong:var2 } = band;

// console.log( bandName );    // Error : variables are var1 and var2 
// console.log( famousSong );  // Error : variables are var1 and var2 

console.log( var1 );
console.log( var2 );
console.log();

//store rest properties
let { bandName, famousSong, ...restProp} = band;
console.log( bandName ); 
console.log( famousSong );
console.log( restProp );
console.log("\n");










//-------> Property value shorthand
function makeUser(name, age) {
    return {
        name : name,
        age : age
    }
}
user = makeUser("pranav", 23);
console.log(user);

//shorthand for above code
function makeUserShort(name, age) {
    return {
        name,
        age,
        roll : 20 //can add more property externally
    }
}
user = makeUserShort("pranav", 23);
console.log(user);
console.log("\n");










//-----------> ANother shorthand to initialise property to obj
let name = "pranav", age = 30;
user = { name, age }; // same as { name: name, age: age }
console.log(user);
console.log("\n");









//--------> Property name limitation : can have any property name even reserved keywords

/*
    In short, there are no limitations on property names. 
    They can be any strings or symbols

    Other types are automatically converted to strings.

    For instance, a number 0 becomes a string "0" when used as a property key:
*/

obj = {
    for : 1,
    if : 2,
    return : 3,
    777 : 2       // same as "777" : 2
};
console.log(`${obj.for +  obj.if + obj.return + obj[777]}`);
console.log(obj);
console.log(obj[777]);   // both access the same property, number 777 converted to string "777"
console.log(obj["777"]);
console.log("\n");










//-------> Existance of property using "in" operator
user = {
    name : "Pranav",
    age : 25,
    roll : 42,
};

console.log(user.name);
console.log(user.noSuchPropertyExist);

console.log("name" in user);
console.log("noProperty" in user);
// console.log(age in user); //--> error

/*
    Please note that on the left side of in there must be a property name. 
    That’s usually a quoted string.

    If we omit quotes, that means a variable should contain the 
    actual name to be tested. For instance:
*/
var key = "age";
console.log(key in user);
console.log("\n");













//---------> Traverse all keys of an object : for..in loop
user = {
    name : "Pranav",
    age : 30,
    isAdmin : true,
};
for (let key in user) {
    console.log(`${key} : ${user[key]}`); // dot operator will not work
}
console.log("\n");











//-------> Ordered properties in object : only integer properties are odered 
let codes = {
    "91" : "India",
    "1" : "USA",
    "49" : "Germany",
}

console.log(codes);

for(let prop in codes){
    console.log(`${prop} : ${codes[prop]}`); // dot operator will not work
}
console.log("\n");











//-------> If we want to preserve the same order then make integer as string
codes = {
    "+91" : "India",
    "+1" : "USA",
    "+49" : "Germany",
}

console.log(codes);

for(let prop in codes){
    console.log(`${prop} : ${codes[prop]}`); // dot operator will not work
}
console.log("\n");












//----> Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
function isEmpty(schedule) {
    for(let key in schedule){
        return false;
    }
    return true;
}

let schedule = {};
console.log(schedule);
console.log(isEmpty(schedule));

schedule["6:00"] = "get up";
console.log(schedule);
console.log(isEmpty(schedule));
console.log("\n");











//---------> Sum object properties
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
}

console.log(sum); // 390
console.log("\n");












//---------> Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
function multiplyNumeric(menu) {
    for (let key in menu) {
        if (typeof menu[key] == "number") {
            //menu[key] = 2 * menu[key];
            menu[key] *= 2;
        }
    }
}

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

console.log(menu);
multiplyNumeric(menu);
console.log(menu);
console.log("\n");








//-------------> Built-in Object Methods


// 1. Object.keys(obj) : Returns an array of keys.
user = {
    name : "pranav",
    age : 37,
    isAdmin : false
};
console.log(Object.keys(user));



// 2. Object.values(obj) : Returns an array of values.
user = {
    name : "pranav",
    age : 37,
    isAdmin : false
};
console.log(Object.values(user));




// 3. Object.entries(obj) : Returns an array of [key, value] pairs.
user = {
    name : "pranav",
    age : 37,
    isAdmin : false
};
console.log(Object.entries(user));





// 4. Object.assign(target, sources...) : Copies properties from sources to target.
obj1 = { name : "Pranav" };
obj2 = { age : 50 };
let merged = Object.assign( {}, obj1, obj2 );
console.log(merged);
console.log("\n");





// 5. Object.hasOwn(obj, key) (modern version of hasOwnProperty) : Checks if the key exists in the object.
obj = { name : "pranav" };
console.log(obj);

console.log(Object.hasOwn(obj, "name"));






// 6. Object.freeze(obj) : Makes an object immutable – you cannot add, remove, or change any properties.

let object1 = {
    name : "Pranav",
    age : 45,
    address : "UP" 
};
console.log(object1);

Object.freeze(object1);

object1.name = "Bob";     // ❌ Won't modify
object1.city = "Delhi";   // ❌ Won’t be added
delete object1.age;       // ❌ Won’t be deleted

console.log(object1); // { name: 'Pranav', age: 45, address: 'UP' }







// 7. Object.seal(obj) : Seals an object so that you can modify existing properties but cannot add or delete properties.

let book = {
    title : "Atomic habit",
    pages : 400
};
console.log(book);

Object.seal(book);

book.pages = 100;         // ✅ Allowed
book.author = "John";     // ❌ Not added
delete book.title;        // ❌ Not deleted

console.log(book); // { title: 'Atomic habit', pages: 100 }






// 8. Object.is(value1, value2) : Compares two values for strict equality (like ===) but handles edge cases more accurately.

/*
    📌 Key Differences from === :

        Object.is(NaN, NaN) → true
        But NaN === NaN → false

        Object.is(+0, -0) → false
        But +0 === -0 → true
*/

console.log("✅ Primitive comparisons:");
console.log(Object.is(100, 100));     // true (same number)
console.log(Object.is("a", "a"));     // true (same string)
console.log(Object.is(true, true));   // true (same boolean)
console.log(Object.is(false, true));  // false (different boolean)
console.log(Object.is(null, null));   // true

console.log("\n❗ Special cases:");
console.log(Object.is(NaN, NaN));     // true (unlike NaN === NaN which is false)
console.log(NaN === NaN);             // false (just for comparison)

console.log(Object.is(+0, -0));       // false (=== treats them equal, but Object.is does not)
console.log(+0 === -0);               // true

console.log("\n🔁 Object comparisons:");
console.log(Object.is([], []));       // false (different memory reference)
console.log(Object.is({}, {}));       // false (different memory reference)

obj = { a: 1 };
console.log(Object.is(obj, obj));     // true (same reference)

/*
    📌 Explanation : 
        - Object.is() works like === but is more precise.
        - It treats NaN === NaN as true.
        - It treats +0 and -0 as different.
        - It compares by reference for objects and arrays.
*/





//---------> Doubt

user = {
    name : "Pranav",
    age : 20,
};

key = "age";
console.log(user[key]);

user[key] *= 2;
console.log(user[key]);




/*
    📌 Few Other Methods Of Object :


    |           Method             |              Purpose                           |
    |------------------------------|------------------------------------------------|
    | Object.getOwnPropertyNames   | Gets all property names (incl. non-enumerable) |
    | Object.getPrototypeOf        | Gets the prototype of an object                |
    | Object.setPrototypeOf        | Sets the prototype of an object                |
    | Object.defineProperty        | Defines/modifies a property with descriptors   |
    | Object.defineProperties      | Defines multiple properties                    |
    | Object.preventExtensions     | Prevents adding new properties                 |
    | Object.isExtensible          | Checks if new properties can be added          |
    | Object.fromEntries           | Creates object from array of key-value pairs   |

*/

