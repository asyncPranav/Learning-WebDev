const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

// method-01
/* 
module.exports.add = add; 
module.exports.sub = sub;  
*/

// method-02
module.exports = { add, sub, mul, div };
