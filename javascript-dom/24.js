// event behind the scene

console.log("Script start !!!\n");

const allButtons = document.querySelectorAll(".my-buttons button");
console.log(allButtons);

allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let num = 0;
        for (let i = 0; i < 1000000000; i++) {
            num += i;
        }
        console.log(e.currentTarget.textContent, num);
    });
});

let outerVar = 0;
for (let i = 0; i < 1000000000; i++) {
    outerVar += i;
}
console.log("outerVar " + outerVar);

console.log("Script end !!!\n");
