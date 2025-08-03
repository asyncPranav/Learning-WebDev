// function returning promise

function friedricePromise() {
    const bucket = ["coffee", "chips", "vegetables", "salt", "rice"];
    return new Promise((resolve, reject) => {
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
}



/* friedricePromise().then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat ", myFriedrice);
    },
    // execute when promise rejected
    (error) => {
        console.log(error);
    }
); */





friedricePromise().then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat", myFriedrice);
    }
    // execute when promise rejected
).catch((error) => {
    console.log(error);
});

