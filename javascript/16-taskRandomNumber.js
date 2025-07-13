/*
    The built-in function Math.random() creates a random value from 0 to 1 (not including 1).
    Write the function random(min, max) to generate a random floating-point number from min to max (not including max).
*/

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let num = random(1,5)
console.log(num);


/*
    🔍 Explanation:
        1. Math.random() gives you a number in [0, 1)
        2. Multiply by (max - min) to scale it to the range [0, max - min)
        3. Add min to shift the range: [min, max)
*/

