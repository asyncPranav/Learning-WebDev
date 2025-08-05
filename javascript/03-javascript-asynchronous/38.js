// Promise and setTimeout


// I want to resolve / reject promise after 2 seconds

function friedricePromise() {
    const bucket = ["coffee", "chips", "vegetables", "salt", "rice"];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(
                bucket.includes("vegetables") &&
                bucket.includes("salt") &&
                bucket.includes("rice")
            ) {
                resolve("fried rice");
            } else {
                reject("can't do it");
            }
        }, 2000);
    });
}


friedricePromise().then(
    // execute when promise resolved
    (myFriedrice) => {
        console.log("let's eat", myFriedrice);
    }
    // execute when promise rejected
).catch((error) => {
    console.log(error);
});
