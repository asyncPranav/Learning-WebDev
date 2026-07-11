const os = require("node:os");

console.log("========================================");
console.log("        SYSTEM INFORMATION");
console.log("========================================");

console.log("Hostname              :", os.hostname());
console.log("Platform              :", os.platform());
console.log("Operating System      :", os.type());
console.log("OS Release            :", os.release());
console.log("OS Version            :", os.version());
console.log("Architecture          :", os.arch());

console.log("\n========================================");
console.log("           USER INFORMATION");
console.log("========================================");

const user = os.userInfo();

console.log("Username              :", user.username);
console.log("Home Directory        :", os.homedir());
console.log("Temporary Directory   :", os.tmpdir());

console.log("\n========================================");
console.log("          MEMORY INFORMATION");
console.log("========================================");

const totalMemory = (os.totalmem() / 1024 ** 3).toFixed(2);
const freeMemory = (os.freemem() / 1024 ** 3).toFixed(2);
const usedMemory = (totalMemory - freeMemory).toFixed(2);

console.log("Total RAM             :", totalMemory, "GB");
console.log("Free RAM              :", freeMemory, "GB");
console.log("Used RAM              :", usedMemory, "GB");

console.log("\n========================================");
console.log("          CPU INFORMATION");
console.log("========================================");

console.log("CPU Cores             :", os.cpus().length);
console.log("Available Threads     :", os.availableParallelism());

const cpu = os.cpus()[0];

console.log("CPU Model             :", cpu.model);
console.log("CPU Speed             :", cpu.speed, "MHz");

console.log("\n========================================");
console.log("         SYSTEM UPTIME");
console.log("========================================");

const uptime = os.uptime();

const days = Math.floor(uptime / 86400);
const hours = Math.floor((uptime % 86400) / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = uptime % 60;

console.log(
  `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`,
);

console.log("\n========================================");
console.log("      NETWORK INFORMATION");
console.log("========================================");

console.log(os.networkInterfaces());

console.log("\n========================================");
console.log("       OTHER INFORMATION");
console.log("========================================");

console.log("End Of Line Character :", JSON.stringify(os.EOL));
console.log("Endianness            :", os.endianness());
console.log("Load Average          :", os.loadavg());

console.log("\n========================================");
console.log("Program Finished");
console.log("========================================");
