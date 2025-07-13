// ------> this keyword's value




const btn = document.querySelector(".btn-headline");


/* function clickFunc() {
    console.log("Clicked");

    console.log("Value of this :");
    console.log(this); // <button class="btn btn-headline">Learn More</button>
}
btn.addEventListener("click", clickFunc); */




/* btn.addEventListener("click", function() {
    console.log("Clicked");

    console.log("Value of this :");
    console.log(this); // <button class="btn btn-headline">Learn More</button>
}); */




btn.addEventListener("click", () => {
    console.log("Clicked");

        console.log("Value of this :");
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
});

















