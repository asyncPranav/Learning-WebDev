const randomBtn = document.querySelector(".randomBtn");
const colorInput = document.querySelector("#colorInput");
const applyBtn = document.querySelector(".applyBtn");
const currentColorValue = document.querySelector(".currentColorValue")


const handleRandomBtnClick = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red}, ${green}, ${blue})`;

    changeColor(color);
    currentColorValue.textContent = color;
}

const handleApplyBtnClick = () => {
    const color = colorInput.value;
    changeColor(color);
    currentColorValue.textContent = color;
    colorInput.value = "";
}

const changeColor = (color) => {
    document.body.style.backgroundColor = color;
}

randomBtn.addEventListener("click",handleRandomBtnClick);
applyBtn.addEventListener("click", handleApplyBtnClick);
