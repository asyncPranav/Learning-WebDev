// Task : Progress Bar Simulation

let progress = 0;

let bar = setInterval(() => {
    console.log(`Progress : ${progress}%`);
    progress += 10;

    if (progress >= 100) {
        clearInterval(bar);
        console.log("Task Completed !!");
    }
    
}, 500);