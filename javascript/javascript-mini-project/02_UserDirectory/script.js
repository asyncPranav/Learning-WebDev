const userContainer = document.querySelector(".userContainer");
const searchInput = document.querySelector("#searchInput");

// 1. Listing user dynamically from array of object of user
const users = [
    {
        profileUrl:"https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        name: "Pranav singh",
        email: "pranav@gmail.com",
    },
    {
        profileUrl:"https://plus.unsplash.com/premium_photo-1689570350306-3aa2bc42189e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ashutosh tripathi",
        email: "coderboy@gmail.com",
    },
    {
        profileUrl:"https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        name: "Zeeshan",
        email: "maverick@gmail.com",
    },
];

function renderUser(userArr) {

    userContainer.innerHTML = "";

    // if (userArr.length === 0) {
    //     userContainer.textContent = "No user found";
    //     return;
    // }

    if (userArr.length === 0) {
        const noUserMessage = document.createElement("div");
        noUserMessage.className = "no-user-found";
        noUserMessage.innerHTML = `
            <p>No users found</p>
        `;
        userContainer.appendChild(noUserMessage);
        return;
    }


    userArr.map((obj) => {
        //destructure to get properties of obj --> you can also directly use ${obj.propertyName} instead of it
        const { profileUrl, name, email } = obj;

        const newElement = document.createElement("div");
        newElement.innerHTML = `
            <img src=${profileUrl}>
            <div class="userDetails">
                <h3 class="userName">${name}</h3>
                <p class="userEmail">${email}</p>
            </div>
        `;
        newElement.className = "userItem";

        userContainer.append(newElement);
    });
}

renderUser(users);




// 2. searching user using name, email

const handleSearch = (e) => {
    // console.log(searchInput.value);
    // console.log(e.target.value);
    let searchValue = e.target.value;

    let filteredUsers = users.filter((obj) => {
        return (
            obj.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            obj.email.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    renderUser(filteredUsers);
};

searchInput.addEventListener("input", handleSearch);
