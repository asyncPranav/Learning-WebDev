// callbacks, callback hell, pyramid of doom
// asynchronous programming

const heading1 = document.querySelector(".heading-1");
const heading2 = document.querySelector(".heading-2");
const heading3 = document.querySelector(".heading-3");
const heading4 = document.querySelector(".heading-4");
const heading5 = document.querySelector(".heading-5");
const heading6 = document.querySelector(".heading-6");
const heading7 = document.querySelector(".heading-7");
const heading8 = document.querySelector(".heading-8");
const heading9 = document.querySelector(".heading-9");
const heading10 = document.querySelector(".heading-10");


/* setTimeout(() => {
    heading1.textContent = "Heading 1";
    heading1.style.color = "violet";
}, 1000);

setTimeout(() => {
    heading2.textContent = "Heading 2";
    heading2.style.color = "salmon";
}, 2000);

setTimeout(() => {
    heading3.textContent = "Heading 3";
    heading3.style.color = "gold";
}, 3000); */


/* setTimeout(() => {
    heading1.textContent = "Heading 1";
    heading1.style.color = "violet";

    setTimeout(() => {
        heading2.textContent = "Heading 2";
        heading2.style.color = "salmon";

        setTimeout(() => {
            heading3.textContent = "Heading 3";
            heading3.style.color = "gold";
        }, 1000);

    }, 1000);    

}, 1000); */







//----------------> Callback Hell


/*
    Practice Task :


    Text        Delay       Color
    
    one         1s          violet
    two         2s          gold
    three       3s          salmon
    four        4s          red
    five        5s          lightgreen
    six         6s          brown
    seven       7s          royalblue

*/



/* setTimeout(() => {
    heading1.textContent = "One";
    heading1.style.color = "violet";
    
    setInterval(() => {
        heading2.textContent = "Two";
        heading2.style.color = "gold";

        setInterval(() => {
            heading3.textContent = "Three";
            heading3.style.color = "salmon";

            setInterval(() => {
                heading4.textContent = "Four";
                heading4.style.color = "skyblue";

                setInterval(() => {
                    heading5.textContent = "Five";
                    heading5.style.color = "lightgreen";

                    setInterval(() => {
                        heading6.textContent = "Six";
                        heading6.style.color = "brown";

                        setInterval(() => {
                            heading7.textContent = "Seven";
                            heading7.style.color = "royalblue";

                            setInterval(() => {
                                heading8.textContent = "Eight";
                                heading8.style.color = "orange";

                                setInterval(() => {
                                    heading9.textContent = "Nine";
                                    heading9.style.color = "blue";

                                    setInterval(() => {
                                        heading10.textContent = "Ten";
                                        heading10.style.color = "darkslateblue";
                                    }, 10000);

                                }, 9000);

                            }, 8000);

                        }, 7000);

                    }, 6000);

                }, 5000);

            }, 4000);

        }, 3000);

    }, 2000);

}, 1000); */





// Pyramid of doom

function changeText(element, text, color, time, onSuccessCallback, onFailureCallback) {
    setTimeout(() => {
        if (element) { //if element exist ( not null )
            element.textContent = text;
            element.style.color = color;

            if (onSuccessCallback) {
                onSuccessCallback();
            }

        } else {
            if (onFailureCallback) {
                onFailureCallback();
            }
        }
    }, time);
}


changeText(heading1, "One", "violet", 1000, () => {
    changeText(heading2, "Two", "salmon", 2000, () => {
        changeText(heading3, "Three", "gold", 3000, () => {
            changeText(heading4, "Four", "royalblue", 4000, () => {
                changeText(heading5, "Five", "lightgreen", 5000, () => {
                    changeText(heading6, "Six", "brown", 6000, () => {
                        changeText(heading7, "Seven", "skyblue", 7000, () => {
                            changeText(heading8, "Eight", "red", 8000, () => {
                                changeText(heading9, "Nine", "slateblue", 9000, () => {
                                    changeText(heading10, "Ten", "tomato", 10000, () => {
                                        
                                    }, () => console.log("Heading10 does not exist") );
                                }, () => console.log("Heading9 does not exist") );
                            }, () => console.log("Heading8 does not exist") );
                        }, () => console.log("Heading7 does not exist") );
                    }, () => console.log("Heading6 does not exist") );
                }, () => console.log("Heading5 does not exist") );
            }, () => console.log("Heading4 does not exist") );
        }, () => console.log("Heading3 does not exist") );
    }, () => console.log("Heading2 does not exist") );
}, () => console.log("Heading1 does not exist") );

















