// event object 




/* const firstButton = document.querySelector("#one");

firstButton.addEventListener("click", function(){
    console.log(this);
}) */



// jab bhi mai kisi bhi element pe event listener add hoga 
// js Engine ---> line by line execute karta hai 
// browser ----> js Engine + extra features 
// browser -----> js Engine + WebApi

// jab browser ko pata chala ki user ne event perform kia 
// jo hum listen kar rahe hai 
// browser(web api) -----> 2 kam krega
// 1.) callback function hai vo js Engine ko dega execute krne ke liye 
// 2.)  callback function ke sath browser jo event hua hai uski information bhi dega
// ye info hamein ek object ke form mai milegi 


/* const firstButton = document.querySelector("#one");

firstButton.addEventListener("click", function(event){
    console.log(event);
}); */









const allButtons = document.querySelectorAll(".my-buttons button");

/* for(let button of allButtons){
    button.addEventListener("click", function() {
        console.log(this.innerText); // My Button one, two, three
    });
} */



/* for(let button of allButtons){
    button.addEventListener("click", () => {
        console.log(this.innerText); // undefined
    });
} */




/* for(let button of allButtons){
    button.addEventListener("click",(e)=>{
        console.log(e);
    });
} */




/* for(let button of allButtons){
    button.addEventListener("click",(e)=>{
        console.log(e.target); // kis element ne event trigger kiya
    });
} */



/* for(let button of allButtons){
    button.addEventListener("click",(e)=>{
        console.log(e.currentTarget); // kis element pe event listener attach kiya tha
    });
} */



