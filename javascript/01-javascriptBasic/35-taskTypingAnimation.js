//Task : Typing Text Animation

// let str = "Pranav singh chandel";
// let index = 0;

// let timerId = setInterval(() => {
//     console.log(str[index++]);
    
//     if (index === str.length) {
//         clearInterval(timerId);
//     }
// }, 1000);

// let text = "Pranav singh chandel";
// let i = 0;

// let typer = setInterval(() => {
//     process.stdout.write(text[i]);
//     i++;
//     if (i >= text.length) {
//         clearInterval(typer);
//         console.log("\nDone!");
//     }
// }, 100);



/*
    In Node.js, process.stdout.write is a method used to print text to 
    the console — just like console.log, but with more control.

    adapt for browser using document.write or innerHTML.
*/




//--------> Method-01 : setInterval

function typingAnimation(text) {
    let i = 0;

    let typer = setInterval(() => {
        process.stdout.write(text[i]);
        i++;
        if (i >= text.length) {
            clearInterval(typer);
            console.log("\nDone!");
        }
    }, 100);
}
typingAnimation("Pranav singh chandel");




//---------> method-02 : setTimeout (recursive)

function typingEffect(text) {
    let index = 0;

    function typeChar() {
        if (index < text.length) {
            process.stdout.write(text[index]);
            index++;
            setTimeout(typeChar, 100);
        } else {
            console.log("\nDone!");
        }
    }

    typeChar();
}

typingEffect("Pranav singh chandel");

