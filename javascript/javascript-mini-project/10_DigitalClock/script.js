const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

function updateClock() {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentSecond = date.getSeconds();
    
    hour.textContent = String(currentHour).padStart(2, '0');
    minute.textContent = String(currentMinute).padStart(2, '0');
    second.textContent = String(currentSecond).padStart(2, '0');
}

updateClock();

setInterval(updateClock, 1000);
