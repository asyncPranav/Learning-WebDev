// Task : Digital Clock (Live time display every second)

setInterval(() => {
    let d = new Date();
    console.log(d.toLocaleTimeString());
}, 1000);