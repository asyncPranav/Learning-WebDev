const body = document.body;
const button = document.querySelector("button");

const id = setInterval(() => {
    const red = Math.floor(Math.random() * 256);
    const green= Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const rgb = `rgb(${red}, ${green}, ${blue})`;

    body.style.background = rgb;

}, 1000);

button.addEventListener("click", () => {
    clearInterval(id);
    button.innerText = body.style.background;
});

