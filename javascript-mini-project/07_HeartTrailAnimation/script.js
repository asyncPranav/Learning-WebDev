const body = document.body;

body.addEventListener("mousemove", function(event) {
    const posX = event.offsetX;    
    const posY = event.offsetY;    

    const newElem = document.createElement("span");

    newElem.style.left = posX + "px";
    newElem.style.top = posY + "px";
    body.append(newElem);

    setTimeout(() => {
        newElem.remove();
    }, 3000);

    const size = Math.random()*50;
    newElem.style.width = size + "px";
    newElem.style.height = size + "px";
});


