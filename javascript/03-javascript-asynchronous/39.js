// Promise.resolve
// Promise chaining



/* const myPromise = Promise.resolve(5);
myPromise.then(
    (value) => {
        console.log(value); // 5
    }
); */



// Promise.resolve(5).then(
//     (value) => {
//         console.log(value); // 5
//     }
// );









//--------------> then() method : always return promise (used for promise chaining)

function myPromise() {
    return new Promise((resolve, reject) => {
        resolve("Pranav");
    });
}

myPromise()
    .then((value) => {
        console.log(value);
        value += "Singh";
        return value;
        /*
            yaha promise return ho rha hai, not string
            internally : return Promise.resolve(value);
            
            if we do not return anything then by default it return undefined
            internally : return Promise.resolve(undefined);
        */
    })
    .then((value) => {
        console.log(value);
        value += "Chandel";
        return value
    })
    .then(
        (value) => {
            console.log(value);
        }
    );
























