const listContainer = document.querySelector(".listContainer");
const addInput = document.querySelector("#addInput");
const addInputBtn = document.querySelector(".addInputBtn");
const doneBtn = document.querySelector(".doneBtn");
const deleteBtn = document.querySelector(".deleteBtn");

const list = [
    // {
    //     id: 1,
    //     text: "hello",
    // },
    // {
    //     id: 12,
    //     text: "hello 2",
    // },
    // {
    //     id: 123,
    //     text: "hello 3",
    // },
];



// 1. render todo item dynamically from array

function renderList(arr) {

    listContainer.innerHTML = "";

    list.map((obj) => {
        const newElement = document.createElement("div");
        newElement.classList.add("list");

        const { id, text } = obj;

        newElement.innerHTML = `
            <p>${text}</p>
            <div class="todoButton">
                <button class="btn doneBtn"><i class="fa-solid fa-check"></i></button>
                <button class="btn deleteBtn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        listContainer.append(newElement);
    });
}

renderList(list);





// 2. take input todo and push them to list array then render

function handleAddInputBtn(e) {
    e.preventDefault();

    const inputValue = addInput.value.trim(); 
    if (!inputValue) return;

    const obj = {
        id: Date.now(),
        text: inputValue,
    };
    list.unshift(obj);

    renderList(list);
    addInput.value = "";
}

addInputBtn.addEventListener("click", handleAddInputBtn);






// 3. todo list button funcationality (revise array methods)

listContainer.addEventListener("click", function (e) {

    e.preventDefault();

    const btn = e.target.closest("button");

    // Find the parent .list div
    const todoElement = btn.closest(".list");

    // Get text from <p> element
    const todoText = todoElement.querySelector("p").textContent;

    if (btn.classList.contains("doneBtn")) {
        // Mark as done
        todoElement.firstElementChild.style.textDecoration = "line-through";
    }

    if (btn.classList.contains("deleteBtn")) {
        // todoElement.remove();
        // renderList(list)

        const index = list.findIndex((obj) => obj.text === todoText);
        if (index !== -1) {
            list.splice(index, 1);
            // renderList(list); // rerender and  must pass the array
            todoElement.remove();
        }
    }
});