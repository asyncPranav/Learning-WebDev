// Dom tree

const body = document.body;
console.log(body);
console.log(body.childNodes);
console.log(body.children);

const container = document.querySelector(".container");
console.log(container);
console.log(container.childNodes);
console.log(body.children);

const h1 = document.querySelector(".container h1");
console.log(h1);


console.log(h1.parentNode.parentNode.previousSibling.previousSibling);


console.log(body.previousElementSibling);

console.log(body.parentElement);

for(let elem of container.children){
    console.log(elem);
    
}

console.log(container.outerHTML);
console.log(container.innerHTML);
console.log(container.innerText);
