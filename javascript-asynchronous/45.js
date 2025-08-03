// fetch

// const URL = "https://jsonplaceholder.typicode.com/posts";

/* const whatIsThis = fetch(URL);
console.log(whatIsThis); // fetch return Promise */

/* fetch(URL)
    .then((response) => {
        // console.log(response);
        // console.log(response.json()); // return promise
        return response.json();
    })
    .then((data) => {
        console.log(data);
    }); */

/* const URL = "https://jsonplaceholder.typicode.com/postsssssssssss";

fetch(URL)
    .then((response) => {
        // console.log(response.json()); // return promise
        // console.log("Inside then");
        // console.log(response); // ok : false

        if (response.ok === true) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) => {
        console.log("Inside then");
        console.log(data);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });

    // Fetch reject only in case of network error */







const URL = "https://jsonplaceholder.typicode.com/posts";

fetch(URL, {
    method: "POST",
    body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) => {
        console.log("Inside then");
        console.log(data);
    })
    .catch((error) => {
        console.log("Inside catch");
        console.log(error);
    });
