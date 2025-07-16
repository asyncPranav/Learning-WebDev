const openModalBtn = document.querySelector(".openModalBtn");
const modalContainer = document.querySelector(".modalContainer");
const closeModalBtn = document.querySelector(".closeModalBtn");

openModalBtn.addEventListener("click", function () {
    modalContainer.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
    modalContainer.style.display = "none";
});

modalContainer.addEventListener("click", function (event) {
    if (event.target.className === "modalContainer") {
        modalContainer.style.display = "none";
    }
    // console.log(event.target);
    
});
