const { add, sub, mul, div } = require("./math");

console.log(add(5, 10));
console.log(sub(5, 10));
console.log(mul(5, 10));
console.log(div(5, 10));
console.log("\n");

// or

const math = require("./math");
console.log(math.add(5, 10));
console.log(math.sub(5, 10));
console.log(math.mul(5, 10));
console.log(math.div(5, 10));
