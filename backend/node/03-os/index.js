// -> Read more methods from notes

const os = require("node:os");

console.log(__dirname);
console.log(__filename);




// platform()

console.log("\n------------------ platform() ------------------\n");

console.log(os.platform());




// arch()

console.log("\n------------------ arch() ------------------\n");

console.log(os.arch());




// hostname()

console.log("\n------------------ hostname() ------------------\n");

console.log(os.hostname());




// type()

console.log("\n------------------ type() ------------------\n");

console.log(os.type());




// release()

console.log("\n------------------ release() ------------------\n");

console.log(os.release());




// version()

console.log("\n------------------ version() ------------------\n");

console.log(os.version());




// userInfo()

console.log("\n------------------ userInfo() ------------------\n");

console.log(os.userInfo());




// homedir()

console.log("\n------------------ homedir() ------------------\n");

console.log(os.homedir());




// tmpdir()

console.log("\n------------------ tmpdir() ------------------\n");

console.log(os.tmpdir());




// cpus()

console.log("\n------------------ cpus() ------------------\n");

console.log(os.cpus());




// availableParallelism()

console.log("\n------------------ availableParallelism() ------------------\n");

console.log(os.availableParallelism());




// totalmem() and freemem()

console.log("\n------------------ Memory ------------------\n");

console.log("Total Memory:", os.totalmem(), "bytes");
console.log("Free Memory :", os.freemem(), "bytes");




// uptime()

console.log("\n------------------ uptime() ------------------\n");

console.log("System Uptime:", os.uptime(), "seconds");




// loadavg()

console.log("\n------------------ loadavg() ------------------\n");

console.log(os.loadavg());




// networkInterfaces()

console.log("\n------------------ networkInterfaces() ------------------\n");

console.log(os.networkInterfaces());




// endianness()

console.log("\n------------------ endianness() ------------------\n");

console.log(os.endianness());




// constants

console.log("\n------------------ constants ------------------\n");

console.log(os.constants);