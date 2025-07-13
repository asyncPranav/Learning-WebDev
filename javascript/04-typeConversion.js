//-----------------------------STRING CONVERSION-----------------------------


let value = true;
console.log(typeof value);
value = String(value);
console.log(typeof value);


//-----------------------------NUMBER CONVERSION-----------------------------


let str1 = "1234";
console.log(typeof str1);
let num1 = Number(str1);
console.log(typeof num1);

let str2 = "1234pranav";
console.log(str2); 
let num2 = Number(str2);
console.log(num2); // NaN

let age = Number("an arbitrary string instead of number");
console.log(age); //NaN

let str3; //undefined
let output = Number(str3);
console.log(output); //NaN

console.log(Number(123));
console.log(Number("123"));
console.log(Number("       123           "));
console.log(Number("    "));
console.log(Number("\t\n"));
console.log(Number("123mbappe"));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined));
 


//-----------------------------BOOLEAN CONVERSION-----------------------------


console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(""));
console.log(Boolean("            "));
console.log(Boolean("\t\n"));
console.log(Boolean("0"));
console.log(Boolean("123"));
console.log(Boolean(null));
console.log(Boolean(undefined));


