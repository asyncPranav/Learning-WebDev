const smallCursor = document.querySelector(".smallCursor");
const shadowCursor = document.querySelector(".shadowCursor");

let mouseX = 0;
let mouseY = 0;
let animationID = null;
let timer = null; 

document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    smallCursor.style.left = mouseX + "px";
    smallCursor.style.top = mouseY + "px";
    // console.log(event.clientX, event.clientY);

    if (!animationID) {
        animateShadowCursor();
    }

    clearTimeout(timer);
    // timer = setTimeout(() => {
    //     cancelAnimationFrame(animationID);
    // }, 2000);
    
    timer = setTimeout(() => {
        cancelAnimationFrame(animationID);
        animationID = null; // ✅ reset so animation restarts next time
    }, 2000);


});


function animateShadowCursor() {
    let currentX = parseFloat(shadowCursor.style.left) || 0;
    let currentY = parseFloat(shadowCursor.style.top) || 0;
    // console.log(currentX, currentY);

    let distanceX = mouseX - currentX;
    let distanceY = mouseY - currentY;

    // console.log(currentX + distanceX * 0.1 + "px", currentY + distanceY * 0.1 + "px");
    

    shadowCursor.style.left = currentX + distanceX * 0.1 + "px";
    shadowCursor.style.top = currentY + distanceY * 0.1 + "px";


    animationID = requestAnimationFrame(animateShadowCursor);
    console.log(animationID);
}

// animateShadowCursor();







