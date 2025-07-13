//---------------> Quotes for string in js

let single = 'single-quoted';
let double = 'double-quoted';
let backticks = `backticks`;
console.log( single );
console.log( double );
console.log( backticks );

//  Backticks allow us to embed any expression into the string, by wrapping it in ${…}
function sum(a, b) {
    return a + b;
}
console.log(`1 + 2 = ${sum(1, 2)}`);


// Another advantage of using backticks is that they allow a string to span multiple lines
// But single or double quotes do not work this way.
// If we use them and try to use multiple lines, there’ll be an error:

let guestList = `Guests :
* John
* Pete
* Bob
* Mary
`; // this causes linebreak
console.log( guestList );
console.log("\n");









//---------------> Special characters

guestList = "Guests : \n * John\n * Pete\n * Bob\n * Mary";
console.log( guestList );

console.log( "A book name \"Godan\" is very famous");
console.log( 'A book name \'Godan\' is very famous');
console.log( `A book name \`Godan\` is very famous`);

console.log("Backslash : \\");
console.log("\n");











//---------------> String length : .length property

console.log( "My\n".length );
console.log("\n");

/*
    People with a background in some other languages sometimes mistype by calling 
    str.length() instead of just str.length. That doesn’t work.

    Please note that str.length is a numeric property, not a function. 
    There is no need to add parenthesis after it. Not .length(), but .length.
*/











//-------------> Accessing characters : .at(pos) method

let str = `Hello`;

// first character
console.log( str[0] );
console.log( str.at(0) );

// last character
console.log( str[str.length - 1] );
console.log( str.at(-1) );

// The square brackets always return undefined for negative indexes
console.log( str.at[-1] );
console.log("\n");










//-------------> for..of loop : We can also iterate over characters using for..of

for (let ch of "Hello") {
    console.log( ch );
}
console.log("\n");










//-------------> Strings are immutable : You cannot change individual characters of a string after it's created.

let str2 = "Hi";
str2[0] = 'h';
console.log( str2 );

/*
1. Non-strict mode (which you're in by default)
- Does not throw an error, but it doesn't change the string either.
2. Strict mode
- If you add "use strict", JavaScript will throw an error:
- TypeError: Cannot assign to read-only property
*/



// Solution :  create a whole new string and assign it to str2 instead of modifying old one.
str2 = "Hi";
str2 = 'h' + str2[1]; // replace the string
console.log( str2 );
console.log("\n");











//--------------> Changing the case : toLowerCase() and toUpperCase() methods

console.log( "Pranav".toUpperCase() );
console.log( "Pranav".toLowerCase() );

// if we want a single character lowercased
console.log( "Pranav"[0].toLowerCase() );
console.log("\n");










//----------------> Searching for a substring 


//  1. includes(substr,pos) – Most common and beginner-friendly
str = "Hello, Pranav!";
console.log(str.includes("Pranav")); // true
console.log(str.includes("pranav")); // false (case-sensitive)






// 2. indexOf(substr,pos) – Gives position of substr, pos parameter is optional
str = "Hello, Pranav!";
console.log(str.indexOf("Pranav")); // 7
console.log(str.indexOf("pranav")); // -1 (case-sensitive), Returns -1 if not found.

str = "Hello, Pranav! Pranav again!";
console.log(str.indexOf("Pranav", 8)); // 15


// find index of all "as"
str = 'As sly as a fox, as strong as an ox';
let target = 'as';
pos = 0;

while (true) {
    let foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;
    
    console.log( `Found at ${foundPos}` );
    pos = foundPos + 1; // continue the search from the next position
}


// The same algorithm can be layed out shorter:
str = "As sly as a fox, as strong as an ox";
target = "as";
pos = -1;

while ((pos = str.indexOf(target, pos + 1)) != -1) {
    console.log( `Found at ${pos}` );
}


// find index of all apples
str = "apple, banana, apple, mango";
pos = 0;

while ((pos = str.indexOf("apple", pos)) !== -1) {
  console.log("Found at:", pos);
  pos += 1; // Move forward to continue searching
}


/*
    ✅ str.lastIndexOf(substr, position)
        There is also a similar method str.lastIndexOf(substr, position) that searches from the end of a string to its beginning.
        It would list the occurrences in the reverse order.
*/







//  3. search() – Allows regex

str = "Hello, Pranav!";
console.log(str.search("Pranav"));      // 7
console.log(str.search(/pranav/i));     // 7 (case-insensitive using regex)








// 4. match() – Returns actual match , allows regex
str = "Hello, Pranav!";
console.log(str.match("Pranav"));      // ["Pranav"]
console.log(str.match(/pranav/i));     // ["Pranav"]





// 5. startsWith() / endsWith() – For prefix/suffix checks
str = "Hello, Pranav!";
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!"));       // true




// regex in js with match (obsidian)
str = "I Love LOVE";
let regex = /love/gi;

console.log(str.match(regex)); // → ["Love", "LOVE"]
console.log("\n");









//----------------> Getting a substring


// 1. str.slice(start, end)

str = "stringify";
console.log( str.slice(0, 5) ); // 'strin' , (not including 5)
console.log( str.slice(0, 1) ); // 's'

// If there is no second argument, then slice goes till the end of the string:
str = "stringify";
console.log( str.slice(2) ); // 'ringify',

// Negative values for start/end are also possible. They mean the position is counted from the string end:
str = "stringify";
console.log( str.slice(-4, -1) ); // 'gif'






// 2. substring(start, end)

/*
    Returns the part of the string between start and end (not including end).

    This is almost the same as slice, but it allows start to be greater than end 
    (in this case it simply swaps start and end values).

    Negative arguments are (unlike slice) not supported, they are treated as 0.
*/

str = "stringify";

// these are same for substring
console.log( str.substring(2, 6) ); // "ring"
console.log( str.substring(6, 2) ); // "ring"

// ...but not for slice:
console.log( str.slice(2, 6) ); // "ring" (the same)
console.log( str.slice(6, 2) ); // "" (an empty string)







// 3. substr(start, length) ❗Deprecated but still works

str = "stringify";
console.log( str.substr(2, 4) ); // 'ring',


// The first argument may be negative, to count from the end:
str = "stringify";
console.log( str.substr(-4, 2) ); // 'gi',
console.log("\n");














//----------------------> Comparing strings


// 1. A lowercase letter is always greater than the uppercase:
console.log( 'a' > 'Z' ); // true


// 2. Letters with diacritical marks are “out of order”:
console.log( 'Österreich' > 'Zealand' ); // true

/*
    This may lead to strange results if we sort these country names. 
    Usually people would expect Zealand to come after Österreich in the list.

    To understand what happens, we should be aware that strings in Javascript are encoded using UTF-16. 
    That is: each character has a corresponding numeric code.

    There are special methods that allow to get the character for the code and back:
*/





//-----> str.codePointAt(pos) : Returns a decimal number representing the code for the character at position pos

// different case letters have different codes
console.log( "Z".codePointAt(0) ); // 90
console.log( "z".codePointAt(0) ); // 122
console.log( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)


//------> String.fromCodePoint(code) : Creates a character by its numeric code
console.log( String.fromCodePoint(90) ); // Z
console.log( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)



// Now let’s see the characters with codes 65..220 (the latin alphabet and a little bit extra) by making a string of them:
str = "";
for(let i = 65; i <= 220; i++){
    str += String.fromCodePoint(i);
}
console.log( str );
console.log("\n");


/*
    See? Capital characters go first, then a few special ones, 
    then lowercase characters, and Ö near the end of the output.

    Now it becomes obvious why a > Z.

    The characters are compared by their numeric code. 
    The greater code means that the character is greater. 
    The code for a (97) is greater than the code for Z (90).

    All lowercase letters go after uppercase letters because their codes are greater.
    Some letters like Ö stand apart from the main alphabet. Here, its code is greater than anything from a to z.
*/












//-----------> Correct comparisons

/*
    The “right” algorithm to do string comparisons is more complex than it may seem, 
    because alphabets are different for different languages.

    So, the browser needs to know the language to compare.

    Luckily, modern browsers support the internationalization standard ECMA-402.

    It provides a special method to compare strings in different languages, following their rules.

    The call str.localeCompare(str2) returns an integer indicating whether str is less, equal or greater than str2 according to the language rules:

        - Returns a negative number if str is less than str2.
        - Returns a positive number if str is greater than str2.
        - Returns 0 if they are equivalent.
*/

console.log( 'Österreich'.localeCompare('Zealand') ); // -1;
console.log("\n");














//----------> str.trim()  – removes (“trims”) spaces from the beginning and end of the string.

console.log("    Pranav    ");
console.log("    Pranav    ".trim());
console.log("\n");






//---------> str.repeat(n) – repeats the string n times.

console.log("Pranav");
console.log("Pranav ".repeat(4));
console.log("\n");







//---------> str.split(separator, limit) – Splits a string into an array of substrings, Based on a given separator, Optional: You can specify a limit to the number of splits


// 📌 1. Split by character

str = "pranav";
console.log(str);

console.log(str.split("")); //return array of substringn

subStrArr = str.split("");
console.log(subStrArr);





// 📌 2. Split by space

str = "I love JavaScript";
console.log(str);

console.log(str.split(" ")); 





// 📌 3. Split by comma
str = "apple,banana,mango";
console.log(str);

console.log(str.split(",")); 





// 📌 4. Split by a specific character

str = "name|age|location";
console.log(str);

console.log(str.split("|")); 





// 📌 5. Split with limit
str = "a b c d e";
console.log(str);

console.log(str.split(" ", 3)); 




// 📌 6. Split using a word

let sentence = "JavaScript is fun. JavaScript is powerful.";
console.log(sentence);

console.log(sentence.split("JavaScript")); 





// 📌 7. Split a paragraph by line breaks (\n)

let paragraph = "Line1\nLine2\nLine3";
console.log(paragraph);

console.log(paragraph.split("\n"));






// 📌 8. Split on every vowel using RegEx

let text = "education";
console.log(text);

console.log(text.split(/[aeiou]/)); 






// 📌 9. Split string to count characters (length)

let name = "Pranav";
console.log(name);

console.log(name.length);

let chars = name.split("");
console.log(chars.length);







// 📌 10. Split an empty string
let empty = "";
console.log(empty);

console.log(empty.split("")); 





// ⚠️ Notes:

// If no separator is given → returns the entire string as one element in an array:
console.log("hello".split()); // 👉 ['hello']

// If separator is not found in the string → returns full string in array:
console.log("hello".split("-")); // 👉 ['hello']


















// More String methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String