// const path = require("node:path");
const path = require("path");

console.log(__dirname);
console.log(__filename);
console.log("\n");

const filePath = path.join("students", "data", "file.txt");
console.log(filePath);
console.log("\n");

const parsedData = path.parse(filePath);
const resolvedPath = path.resolve(filePath);
const dirName = path.dirname(filePath);
const baseName = path.basename(filePath);
const extName = path.extname(filePath);
console.log({ parsedData, resolvedPath, extName, baseName, dirName });
