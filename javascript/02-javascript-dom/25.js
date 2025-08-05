// practice with click event

const allButtons = document.querySelectorAll(".my-buttons button");
console.log(allButtons);


/*-----> method - 01

    allButtons[0].addEventListener("click", function(){
        this.style.background = "#303030";
        this.style.color += "crimson";
    });


    allButtons[1].addEventListener("click", function(){
        this.style.background = "#303030";
        this.style.color += "gold";
    });


    allButtons[2].addEventListener("click", function(){
        this.style.background = "#303030";
        this.style.color += "deepSkyBlue";
    });
*/




//-----> using iteration

// it will apply same event on all buttons

/* allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        this.style.background = "#404040";
        this.style.color += "deepSkyBlue";
    });
}); */


allButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.target.style.background = "#404040";
        event.target.style.color += "deepSkyBlue";
    });
});


