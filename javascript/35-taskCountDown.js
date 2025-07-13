// Task : Countdown Timer

let seconds = 60;

let timerId = setInterval(() => {
    console.log(`${seconds} sec left !!`);
    seconds--;

    if (seconds <= 0) {
        console.log("Time's up");
        clearInterval(timerId);
    }
}, 1000);


//better approach
function countdown(seconds) {
    let timerId = setInterval(() => {
        console.log(`${seconds} sec left !!`);
        seconds--;
        
        if(seconds <= 0) {
            console.log("Time's up");
            clearInterval(timerId)
        }

    }, 1000);
}
countdown(60);