/*
    🎚 Problem 2: Clamp a Number
    🔢 Given a number x, make sure it's between min and max. If it's smaller than min, return min; if larger than max, return max.

    Example:
    Input: x = 105, min = 0, max = 100 → Output: 100
    Input: x = -5, min = 0, max = 100 → Output: 0
    Input: x = 70, min = 0, max = 100 → Output: 70

    Challenge: Write a function clamp(x, min, max)
*/

let clamp = (x, min, max) => {
    return (x<min) ? min : (x>max) ? max : x;
}

console.log( clamp(105, 0, 100) );
console.log( clamp(-5, 0, 100) );
console.log( clamp(70, 0, 100) );
console.log("\n");




/*
    Problem 2: Get Distance Between Two Numbers
        Write a function getDistance(a, b) that returns how far apart two numbers are.

        Input: getDistance(7, 3) → Output: 4
        Input: getDistance(-2, 6) → Output: 8

        Hint: Use Math.abs
*/

let getDistance = function(a, b) {
    return Math.abs( b - a );
}

console.log( getDistance(7,3) );
console.log( getDistance(-2,6) );
console.log("\n");









/*
⏱ Problem 3: Convert Seconds to hh:mm:ss
Write a function that takes total seconds and returns a string in format "hh:mm:ss"

Input: 3661 → Output: "01:01:01"

Challenge: You must calculate hours, minutes, and seconds from total seconds.
*/

function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    // Pad with leading zeros if needed
    let hh = String(hours).padStart(2, '0');
    let mm = String(minutes).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');
    
    return `${hh}:${mm}:${ss}`;
}

// Example:
console.log(formatTime(3661)); // "01:01:01"
console.log(formatTime(59));   // "00:00:59"
console.log(formatTime(3600)); // "01:00:00"
console.log("\n");










/*
    🔢 Problem 4: Is Even or Odd Without %
        Write isEven(n) without using % operator.

    Hint: Use Math.floor(n/2) * 2 === n
*/


function isEven(n) {
    return (Math.floor(n/2) * 2 === n);
}
console.log( isEven(0) );
console.log( isEven(1) );
console.log( isEven(2) );
console.log( isEven(3) );
















