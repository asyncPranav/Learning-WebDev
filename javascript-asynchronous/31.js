//----------> Synchronous vs Asynchronous programming


//---------------> Synchronous programming

/* console.log("Script start");

for (let i = 0; i < 10000; i++){
    console.log("Inside for loop");
}

console.log("Script end");


// Javascript is Synchronous and single threaded

*/






//-------------> Asynchronous programming


/* console.log("Script start");

setTimeout(() => {
    console.log("Inside setTimeout");
}, 1000);

for (let i=0; i<100; i++) {
    console.log("Inside loop");
}

console.log("Script end"); */



console.log("Script start");

const id = setTimeout(() => {
    console.log("Inside setTimeout");
}, 0);

for (let i=0; i<100; i++) {
    console.log("Inside loop");
}

console.log("setTimeout id is ",id);
console.log("Clearing time out");
clearTimeout(id);

console.log("Script end");
