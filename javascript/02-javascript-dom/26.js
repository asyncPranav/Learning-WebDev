// little demo practice


const mainButton = document.querySelector("button");
const currentColor = document.querySelector(".current-color");
const body = document.body;

mainButton.addEventListener("click", () => {
    const randomColor = randomColorGenerator();
    body.style.backgroundColor = randomColor;
    currentColor.innerText = randomColor;
});


function randomColorGenerator() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const randomColor = `rgb(${red} ${green} ${blue})`;
    return randomColor;
}

