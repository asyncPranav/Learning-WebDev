// write code of 35.js using promises


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




function changeText(element, text, color, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (element) { //if element exist ( not null )
                element.textContent = text;
                element.style.color = color;
                resolve();
            } else {
                reject("Element not found");
            }
        }, time);
    });
}





/* const returnedPromise = changeText(heading1, "One", "red", 1000);

returnedPromise
    .then(() => {
        return changeText(heading2, "Two", "royalblue", 2000);
    })
    .then(() => {
        return changeText(heading3, "Three", "lightgreen", 3000);
    })
    .then(() => {
        return changeText(heading4, "Four", "purple", 4000);
    })
    .then(() => {
        return changeText(heading5, "Five", "tomato", 5000);
    })
    .then(() => {
        return changeText(heading6, "Six", "skyblue", 6000);
    })
    .then(() => {
        return changeText(heading7, "Seven", "yellow", 7000);
    })
    .then(() => {
        return changeText(heading8, "Eight", "violet", 8000);
    })
    .then(() => {
        return changeText(heading9, "Nine", "burlywood", 9000);
    })
    .then(() => {
        return changeText(heading10, "Ten", "teal", 10000);
    }); */





/* changeText(heading1, "One", "red", 1000)
    .then(() => {
        return changeText(heading2, "Two", "royalblue", 2000);
    })
    .then(() => {
        return changeText(heading3, "Three", "lightgreen", 3000);
    })
    .then(() => {
        return changeText(heading4, "Four", "purple", 4000);
    })
    .then(() => {
        return changeText(heading5, "Five", "tomato", 5000);
    })
    .then(() => {
        return changeText(heading6, "Six", "skyblue", 6000);
    })
    .then(() => {
        return changeText(heading7, "Seven", "yellow", 7000);
    })
    .then(() => {
        return changeText(heading8, "Eight", "violet", 8000);
    })
    .then(() => {
        return changeText(heading9, "Nine", "burlywood", 9000);
    })
    .then(() => {
        return changeText(heading10, "Ten", "teal", 10000);
    }); */






changeText(heading1, "One", "red", 1000)
    .then(() => changeText(heading2, "Two", "royalblue", 2000))
    .then(() => changeText(heading3, "Three", "lightgreen", 3000))
    .then(() => changeText(heading4, "Four", "purple", 4000))
    .then(() => changeText(heading5, "Five", "tomato", 5000))
    .then(() => changeText(heading6, "Six", "skyblue", 6000))
    .then(() => changeText(heading7, "Seven", "yellow", 7000))
    .then(() => changeText(heading8, "Eight", "violet", 8000))
    .then(() => changeText(heading9, "Nine", "burlywood", 9000))
    .then(() => changeText(heading10, "Ten", "teal", 10000))
    .catch((error) => console.log(error)); 










