require("./xyz.js");
// require("./sum.js");
// const calculateSum = require("./sum.js");
// const obj = require("./sum.js");
// const { calculateSum, fileName } = require('./sum.js');
const { calculateSum, fileName } = require('./sum'); // if we do not provide ext then it is assumed that we are using .js ext

// importing one module to another using require() function
let name = "Pranav";
console.log(name);

// Modules protect their variables and functios from leaking
// calculateSum(4,5);  // error
// calculateSum(4,5); // works -> 9
// obj.calculateSum(4,5);// works -> 9
// console.log(Object.fileName); // works -> sum.js
calculateSum(4,5); // works -> 9
console.log(fileName); // works -> sum.js





