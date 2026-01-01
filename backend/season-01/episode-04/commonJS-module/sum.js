console.log("Sum module executed");

// Modules protect their variables and functios from leaking by default
// If another module wanna use var and func of one module then that module msut export it and another module must import the module
// Whatever you export from here will be returnes by import function i.e require() function

let fileName = "sum.js";

function calculateSum(a, b) {
  const sum = a+b;
  console.log(sum);
}

// exporting one thing
// module.exports = calculateSum;

// exporting more than one -> we wrap them in object
// module.exports = {
//   calculateSum: calculateSum, 
//   fileName: fileName
// }; 

module.exports = {calculateSum, fileName}; 







