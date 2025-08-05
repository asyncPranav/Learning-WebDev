// event bubbling / propogation
// event capturing


const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");



// Event Bubbling/Propogation

child.addEventListener("click", () => {
    console.log("Bubble ---> child");
});

parent.addEventListener("click", () => {
    console.log("Bubble ---> parent");
});

grandparent.addEventListener("click", () => {
    console.log("Bubble ---> grandparent");
});

document.body.addEventListener("click", () => {
    console.log("Bubble ---> document.body");
});






// Capturing Event

child.addEventListener("click", () => {
    console.log("Capture ---> child");
}, true);

parent.addEventListener("click", () => {
    console.log("Capture ---> parent");
}, true);

grandparent.addEventListener("click", () => {
    console.log("Capture ---> grandparent");
}, true);

document.body.addEventListener("click", () => {
    console.log("Capture ---> document.body");
}, true);

















































