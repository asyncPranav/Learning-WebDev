console.log("Math.js file executed");

const fileName = "math.js";

export function calculateSum(a, b) {
  console.log(a + b);
}

function calculateSub(a, b) {
  console.log(a - b);
}

export {fileName, calculateSub};
