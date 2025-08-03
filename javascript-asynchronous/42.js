const URL = "https://jsonplaceholder.typicode.com/posts";

const xhr = new XMLHttpRequest();
// console.log(xhr);







//----------> Step-01


// console.log(xhr.readyState); // 0

xhr.open("GET", URL);

// console.log(xhr.readyState); // 1

/* xhr.onreadystatechange = function() {
    // console.log(xhr.readyState);
    if (xhr.readyState === 4) {
        // console.log(xhr.readyState);
        // console.log(xhr);
        // console.log(xhr.response);
        // console.log(typeof xhr.response);
        const response = xhr.response;
        const data = JSON.parse(response);
        console.log(data);
        console.log(typeof data);
    }
} */

xhr.onload = function() { //execute only when readyState = 4
    console.log(xhr.readyState);
    const response = xhr.response;
    const data = JSON.parse(response);
    console.log(data);
}

xhr.send();







































