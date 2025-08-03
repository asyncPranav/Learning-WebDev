// async await


// const URL = "https://jsonplaceholder.typicode.com/posts";

/* fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data)); 
*/



/* async function getPosts() {

}

const whatisThis = getPosts();
console.log(whatisThis); // return Promise always */









/* async function getPosts() {
    const response = await fetch(URL);
    const data = await response.json();

    // console.log(response);
    // console.log(data);

    return data; // it return promise resolved with value 'data'
}

console.log(getPosts()); // Promise */







/* async function getPosts() {
    const response = await fetch(URL);
    const data = await response.json();

    // console.log(response);
    // console.log(data);

    return data; // it return promise resolved with value 'data'
}

getPosts().then((myData) => {
    console.log(myData)
}); */








/* const URL = "https://jsonplaceholder.typicode.com/postssssss";

async function getPosts() {
    const response = await fetch(URL);
    const data = await response.json();

    // console.log(response);
    // console.log(data);

    return data; // it return promise resolved with value 'data'
}

getPosts()
    .then((myData) => {
        console.log(myData);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });

// catch block execute only in network failure case */





/* const URL = "https://jsonplaceholder.typicode.com/postssssss";

async function getPosts() {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data; // it return promise resolved with value 'data'
}

getPosts()
    .then((myData) => {
        console.log(myData);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });

// catch block execute only in network failure case */











/* console.log("Script start");

const URL = "https://jsonplaceholder.typicode.com/posts";

async function getPosts() {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data; // it return promise resolved with value 'data'
}

getPosts()
    .then((myData) => {
        console.log(myData);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });

// This is asynchronous task

console.log("Script end"); */







console.log("Script start");

const URL = "https://jsonplaceholder.typicode.com/posts";

// For using arrow function where to write async
const getPosts = async() => {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data; // it return promise resolved with value 'data'
}

getPosts()
    .then((myData) => {
        console.log(myData);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });

// This is asynchronous task

console.log("Script end");


