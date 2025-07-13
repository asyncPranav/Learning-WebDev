// -----------> More ways to write a number

let billion1 = 1000000000;
console.log( billion1 );

let billion2 = 1_000_000_000;
console.log( billion2 );
console.log("\n");


let billion3 = 1e9;
console.log( billion3 );

// In other words, e multiplies the number by 1 with the given zeroes count.
console.log( 1e3 === 1 * 1000 );
console.log("\n");


// lets write something very small
let microSecond1 = 0.000001;
console.log( microSecond1 );

let microSecond2 = 1e-6;
console.log( microSecond2 );
console.log("\n");


// In other words, a negative number after "e" means a division by 1 with the given number of zeroes:

console.log( 1e-3 === 1/1000 );
console.log(12e-3 === 12/1000);



// This compares two mathematically equal numbers:
// 1.23e-5 means 1.23 × 10⁻⁵ → 0.0000123
// 1.23 / 100000 also equals 0.0000123
// But due to how JavaScript stores decimal (floating-point) numbers in binary,
// some values cannot be represented with perfect precision.
// So 1.23 / 100000 results in a slightly imprecise value like 0.000012299999999999999
// Therefore, the strict equality === returns false

console.log(1.23e-5);
console.log(1.23/100000);
console.log(1.23e-5 === 1.23 / 100000); // false (because of floating-point precision error)
console.log("\n");










//---------> Hex, binary and octal numbers

console.log( 0xff );  // Hex
console.log( 0xFF );
console.log( 0b11111111 );  // Binary
console.log( 0o377 );  // Octal
console.log("\n");










//----------> toString(base)

/*
    The method num.toString(base) returns a string representation of num in the numeral system with the given base.
    The base can vary from 2 to 36. By default, it’s 10.

        -> base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.
        
        -> base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.
        
        -> base=36 is the maximum, digits can be 0..9 or A..Z. The whole Latin alphabet is used to represent a number. 
           A funny, but useful case for 36 is when we need to turn a long numeric identifier into something shorter, 
           for example, to make a short url. Can simply represent it in the numeral system with base 36:
*/


let n = 255;
console.log( n.toString(10) );
console.log( n.toString(16) );
console.log( n.toString(2) );

// If we want to call a method directly on a number, like toString in the example above, then we need to place two dots .. after it.
console.log( 255..toString(10) );
console.log( 255..toString(16) );
console.log( 255..toString(2) );
console.log( 255478292379..toString(36) );

// Also we can use parantheses if we did not want to use two dot ..
console.log( (255).toString(10) );
console.log( (255).toString(16) );
console.log( (255).toString(2) );
console.log( (255478292379).toString(36) );
console.log("\n");












//---------------> Rounding


/*
    Math.floor() ➝ Always rounds **down** to the nearest whole number.
    Example: Math.floor(3.9) → 3, Math.floor(-1.1) → -2

    Math.ceil() ➝ Always rounds **up** to the nearest whole number.
    Example: Math.ceil(3.1) → 4, Math.ceil(-1.1) → -1

    Math.round() ➝ Rounds to the **nearest integer**.
    - If decimal is .5 or more, it rounds up.
    - If less than .5, it rounds down.
    Example: Math.round(3.1) → 3, Math.round(3.5) → 4, Math.round(-3.5) → -3
    
    Math.trunc() ➝ Removes the decimal part, **no rounding**, just cuts it off.
    Example: Math.trunc(3.9) → 3, Math.trunc(-1.9) → -1
    ⚠️ Not supported in older browsers like Internet Explorer.
*/

console.log( Math.floor(3.5) );
console.log( Math.ceil(3.5) );
console.log( Math.round(3.5) );


/*
    For instance, we have 1.2345 and want to round it to 2 digits, getting only 1.23.

    There are two ways to do so:
        1. Multiply-and-divide.
        2. The method toFixed(n) rounds the number to n digits after the point and returns a string representation of the result.
*/


let num = 1.2345;
console.log( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
console.log( num.toFixed(2) );
console.log( typeof num.toFixed(2) );


// This rounds up or down to the nearest value, similar to Math.round:
console.log( 12.34.toFixed(1) );
console.log( 12.36.toFixed(1) );


// If the decimal part is shorter than required, zeroes are appended to the end
console.log( 12.36.toFixed(5) );
console.log("\n");


/*
    Please note that the result of toFixed is a string.
    We can convert it to a number using the unary plus or a Number() call, e.g. write +num.toFixed(5).
*/












//-----------> Imprecise calculations

/*
    Internally, a number is represented in 64-bit format IEEE-754, 
    so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 
    11 of them store the position of the decimal point, and 1 bit is for the sign.

    If a number is really huge, it may overflow the 64-bit storage
    and become a special numeric value Infinity:
*/

console.log( 1e500 );










//-------------> Precision loss 

console.log( 0.1 + 0.2 == 0.3 ); // false
console.log( 0.1 + 0.2 );
console.log("\n");


/*
    But why does this happen?

    A number is stored in memory in its binary form, 
    a sequence of bits – ones and zeroes. 
    But fractions like 0.1, 0.2 that look simple in the decimal numeric system
    are actually unending fractions in their binary form.
*/


console.log( 0.1.toString(2) );
console.log( 0.2.toString(2) );
console.log( (0.1 + 0.2).toString(2) );

/*
    What is 0.1? It is one divided by ten 1/10, one-tenth. 
    In the decimal numeral system, such numbers are easily representable. 
    Compare it to one-third: 1/3. It becomes an endless fraction 0.33333(3).

    So, division by powers 10 is guaranteed to work well in the decimal system, 
    but division by 3 is not. For the same reason, in the binary numeral system, 
    the division by powers of 2 is guaranteed to work, but 1/10 becomes an endless binary fraction.

    There’s just no way to store exactly 0.1 or exactly 0.2 using the binary system, 
    just like there is no way to store one-third as a decimal fraction.
*/

console.log( 0.1 + 0.2 );

// The most reliable method is to round the result with the help of a method toFixed(n):

console.log( (0.1 + 0.2).toFixed(2) ); //return string
console.log( +(0.1 + 0.2).toFixed(2) ); //return number
console.log( Number((0.1 + 0.2).toFixed(2)) ); //return number
console.log("\n");











//--------------> Tests: isFinite() and isNaN() : converts its argument to a number

console.log( isNaN(NaN) );
console.log( isNaN(23) );
console.log( isNaN("23") );
console.log( isNaN(true) );
console.log( isNaN("") );

// we cant use equality op to find if value is NaN or not : because NaN doesn't equal anything
console.log( NaN == NaN );
console.log("\n");

//isFinite() converts argument to number and returns true if it’s a regular number, not NaN/Infinity/-Infinity:
console.log( isFinite(12) );
console.log( isFinite("12") );
console.log( isFinite(true) );
console.log( isFinite("") );
console.log( isFinite(NaN) );
console.log( isFinite(Infinity) );
console.log( isFinite(-Infinity) );
console.log("\n");










//-----------> Number.isNaN() and Number.isFinite()

/*
    Number.isNaN and Number.isFinite methods are the more “strict” versions of isNaN and isFinite functions. 
    They do not autoconvert their argument into a number, but check if it belongs to the number type instead.

        1. Number.isNaN(value) returns true if the argument belongs to the number type and it is NaN. 
           In any other case, it returns false.

        2. Number.isFinite(value) returns true if the argument belongs to the number type and it is not NaN/Infinity/-Infinity. 
           In any other case, it returns false.
*/



console.log( Number.isNaN(NaN) ); //true
console.log( Number.isNaN("str" / 2) ); //true

// Note the difference :
console.log( Number.isNaN("str") ); //false
console.log( isNaN("str") ); //true
console.log("\n");




console.log( Number.isFinite(123) ); //false
console.log( Number.isFinite(Infinity) ); //true
console.log( Number.isFinite(-Infinity) ); //true

// Note the difference :
console.log( Number.isFinite("123") ); //false
console.log( isFinite("123") ); //true
console.log("\n");












//------------> parseInt and parseFloat

/*
    Numeric conversion using a plus + or Number() is strict. 
    If a value is not exactly a number, it fails:
*/

console.log( +"100px" );
console.log( +"    100    " ); //spaces are ignored


/*
    But in real life, we often have values in units, like "100px" or "12pt" in CSS. 
    Also in many countries, the currency symbol goes after the amount, 
    so we have "19€" and would like to extract a numeric value out of that.

    That’s what parseInt and parseFloat are for.

    They “read” a number from a string until they can’t. 
    In case of an error, the gathered number is returned. 
    The function parseInt returns an integer, whilst parseFloat will return a floating-point number:
*/

console.log( parseInt("100px") );
console.log( parseFloat("12.5em") );

/* 
    There are situations when parseInt/parseFloat will return NaN. 
    It happens when no digits could be read:
*/

console.log( parseInt("a123") );
console.log("\n");











//-------------> The second argument of parseInt(str, radix)

/*
    The parseInt() function has an optional second parameter. 
    It specifies the base of the numeral system, 
    so parseInt can also parse strings of hex numbers, binary numbers and so on:
*/

console.log( parseInt('0xff', 16) ); // 255
console.log( parseInt('ff', 16) ); // 255, without 0x also works
console.log( parseInt('2n9c', 36) ); // 123456
console.log("\n");












//-------------> Math.random() : creates a random value from 0 to 1 (not including 1).

console.log( Math.random() );
console.log( Math.random() );
console.log( Math.random() );
console.log( Math.random() );
console.log("\n");









//-----------> Math.max(a, b, c...) and Math.min(a, b, c...)

console.log( Math.max(3, 5, -3, -100) );
console.log( Math.min(3, 5, -3, -100) );
console.log("\n");











//----------> Math.pow(n, power) & Math.sqrt()

console.log( Math.pow(2, 5) );
console.log( Math.sqrt(4) );
console.log("\n");












//----------> Why 6.35.toFixed(1) == 6.3?

console.log( 1.35.toFixed(1) );
console.log( 6.35.toFixed(1) ); //why ?? ---> check soln on website









