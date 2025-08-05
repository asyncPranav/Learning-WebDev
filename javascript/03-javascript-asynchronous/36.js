// Intro to promises
console.log("Script start");

const bucket = ["coffee", "chips", "vegetables", "salt", "rice"];

const friedricePromise = new Promise((resolve, reject) => {
    if (
        bucket.includes("vegetables") &&
        bucket.includes("salt") &&
        bucket.includes("rice")
    ) {
        resolve("fried rice"); // can pass anything here 

    } else {
        reject("can't do it"); // can pass anything here 
    }
});



// Produce





// Consume



// How to consume

/* friedricePromise.then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat ", myFriedrice);
    },
    // execute when promise rejected
    (error) => {
        console.log(error);
    }
); */




/* friedricePromise.then(
    // execute when promise resolved
    null,
    // execute when promise rejected
    (error) => {
        console.log(error);
    }
); */





/* friedricePromise.then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat ", myFriedrice);
    },
    // execute when promise rejected
    null
); */





friedricePromise.then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat", myFriedrice);
    }
    // execute when promise rejected
).catch((error) => {
    console.log(error);
});



setTimeout(() => {
    console.log("Inside setTimeout");
}, 0);







// Promise is asynchronous

for(let i=0; i<1000; i++){
    console.log("inside loop");
}

console.log("Script end");

