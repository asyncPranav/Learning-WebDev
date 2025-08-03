//-------------> Set Interval

/* console.log("Script start");

setInterval(() => {
    console.log(Math.random());
}, 1000);

console.log("Script end"); */



console.log("Script start");

const id = setInterval(() => {
    console.log(Math.random());
}, 1000);

console.log("setInterval id is", id);
console.log("Clearing setInterval");
clearInterval(id);

console.log("Script end");











