// 43.js was callback hell, let's promisify it

const URL = "https://jsonplaceholder.typicode.com/posts";

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr.response);
            } else {
                reject(new Error("Something went wrong"));
            }
        };
        xhr.onerror = () => {
            reject(new Error("Something went wrong"));
        };
        xhr.send();
    });
}

// const whatIsThis = sendRequest("GET", URL);
// console.log(whatIsThis);

sendRequest("GET", URL)
    .then((response) => {
        // console.log(response);
        const data = JSON.parse(response);
        // console.log(data);
        return data; // promise return krega aur us promise ko 'data' ke sath resolve kr dega (agar return na kre to undefined ke sath resolve ho jayega)
    })
    .then((data) => {
        console.log(data);
        // console.log(data[3].id);
        const id = data[3].id;
        return id; // yaha returned promise ko 'id' ke sath resolve kr rhe h
    })
    .then((id) => {
        // console.log(id);
        const URL2 = `${URL}/${id}`;
        // console.log(URL2);
        return sendRequest("GET", URL2);
    })
    .then((newResponse) => {
        // console.log(newResponse);
        const newData = JSON.parse(newResponse);
        console.log(newData);
    })
    .catch((error) => {
        console.log(error);
    });
