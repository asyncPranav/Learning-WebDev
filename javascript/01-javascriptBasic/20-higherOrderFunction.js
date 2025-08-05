const area = function (radius) {
    return Math.PI * radius * radius;
};

const circumference = function (radius) {
    return 2 * Math.PI * radius;
};

const diameter = function (radius) {
    return 2 * radius;
};

const calculate = function (radius, logic) {
    let output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]).toFixed(2));
    }
    return output;
};

let radius = [3, 4, 5, 6];

console.log(calculate(radius, diameter));
console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
