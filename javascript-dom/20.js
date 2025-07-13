//------------> intro to event


/*
    Event add krne ke 3 trike hain
        1. html element me onclick = "console.log('clicked')"
        2. btn.onlick = function 
        3. addEventListener method (best way)
*/

const btn = document.querySelector(".btn-headline");



//----> Method-02

/* btn.onclick = function() {
    console.log("Clicked M-2");
} */




//----> Method-03


/* function clickFunc() {
    console.log("Clicked M-3.1");
}
btn.addEventListener("click", clickFunc); */



/* btn.addEventListener("click", function() {
    console.log("Clicked M-3.2");
}); */



btn.addEventListener("click", () => {
    console.log("Clicked M-3.3");
});
















