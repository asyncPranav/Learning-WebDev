

/* const btn1 = document.getElementById("one");
console.log(btn1);

btn1.addEventListener("click", function() {
    console.log("Clicked btn 1");
});

console.log("\n"); */





// add this same event on all buttons at once

const allBtns = document.querySelectorAll("button");
console.log(allBtns); // NodeList(3) [button#one, button#two, button#three]


/*
    we get a Nodelist, here we can use any loop to iterate
        1. simple for loop
        2. for...of loop
        3. forEach method 
*/



/* for (let btn of allBtns) {
    btn.addEventListener("click", function(){
        console.log("Clicked " + this.innerText); // Clicked My Button one, two, three
    });
} */




/* for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener("click", function(){
        console.log("Clicked " + this.innerText); // Clicked My Button one, two, three
    });
} */



allBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
        console.log("Clicked " + this.innerText); // Clicked My Button one, two, three
    });
});





/* for (let btn of allBtns) {
    btn.addEventListener("click", () => {
        console.log("Clicked " + this.innerText); // Cicked undefined
    });
} */












































