const container = document.querySelector(".container");
const span = document.querySelector("span");

const careers = ["Developer", "Freelancer", "Engineer", "Programmer"];

let careerIndex = 0;
let characterIndex = 1;

function updateText() {
    span.innerText = careers[careerIndex].slice(0,characterIndex);
    characterIndex++;

    if (characterIndex > careers[careerIndex].length){
        careerIndex = ( careerIndex + 1 ) % careers.length;
        characterIndex = 1;
    }
    setTimeout(updateText, 200);
}

updateText();




/*
    ❓ Why use modulo here?

        careerIndex = (careerIndex + 1) % careers.length;

        This line is used to loop back to the start of the careers array after reaching the end.



    🔁 Problem without modulo:

        If you keep doing: careerIndex++

        Then:
            - 0 → 1 → 2 → 3 ✅ (fine)
            - Then → 4 ❌ (not valid; careers[4] is undefined)
            - Then → 5 → 6 → ... → 🔥 crash or weird bugs



    ✅ Modulo fixes this:

        careerIndex = (careerIndex + 1) % careers.length;

        So it becomes a cycle: 0 → 1 → 2 → 3 → 0 → 1 → 2 ...
*/
















