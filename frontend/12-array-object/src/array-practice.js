const arr = [0, 1, 2, 3, 4, 5];

let result = arr.includes(2);
console.log(result);

result = arr.find((item) => item > 0);
console.log(result);

result = arr.slice(0, 2);
console.log(result);

result = arr.forEach((item) => console.log(item));
console.log("forEach() does not return anything : ", result);

result = arr.filter((item) => item % 2 === 0);
console.log(result);

result = arr.filter(Boolean);
console.log(result);
console.log(arr);

result = arr.map((item) => item * 2);
console.log(result);
