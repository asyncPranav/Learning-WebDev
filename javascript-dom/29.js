// event delegation

const grandparent = document.querySelector(".grandparent");

/* grandparent.addEventListener("click", () => {
    console.log("You clicked something !!");
}); */


/* grandparent.addEventListener("click", (e) => {
    console.log(e);
}); */


grandparent.addEventListener("click", (e) => {
    console.log(e.target);
});


















