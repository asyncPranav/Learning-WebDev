const os = require("os");

console.log("Platform : ", os.platform());
console.log("CPU Architecture : ", os.arch());
console.log("CPU core : ", os.cpus().length);
console.log("Total memory : ", os.totalmem() / (1024 * 1024 * 1024), "GB");
console.log("Free memory : ", os.freemem() / (1024 * 1024 * 1024), "GB");
console.log("OS uptime : ", os.uptime() / 3600, "hours");
console.log("Home directory : ", os.homedir());
console.log("User info : ", os.userInfo());
console.log("Os hostname : ", os.hostname())
console.log("Network interface : ", os.networkInterfaces())
