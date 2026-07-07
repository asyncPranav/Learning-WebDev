// -> read more methods from notes

const path = require("node:path");

console.log(__dirname);
console.log(__filename);




// join() method

console.log("\n------------------ join() ------------------\n");

const path1 = path.join("users", "images", "profile.jpg");
console.log(path1);

const path2 = path.join("users", "", "profile.jpg");
console.log(path2);

const path3 = path.join("users", ".", "profile.jpg");
console.log(path3);

const path4 = path.join("platform", "users", "..", "profile.jpg");
console.log(path4);




// resolve() method

console.log("\n------------------ resolve() ------------------\n");

const resolve1 = path.resolve("files");
console.log(resolve1);

const resolve2 = path.resolve("files", "raw.pdf");
console.log(resolve2);

const resolve3 = path.resolve("platform", "users", "..", "images");
console.log(resolve3);

const resolve4 = path.resolve(__dirname, "database");
console.log(resolve4);




// basename() method

console.log("\n------------------ basename() ------------------\n");

const basename1 = path.basename("C:/Users/file.txt");
console.log(basename1);

const basename2 = path.basename("C:/Users/file.txt", ".txt");
console.log(basename2);




// dirname() method

console.log("\n------------------ dirname() ------------------\n");

const dirname1 = path.dirname("C:/Users/file.txt");
console.log(dirname1);

const dirname2 = path.dirname("/images/photo.png");
console.log(dirname2);

const dirname3 = path.dirname("app.js");
console.log(dirname3);




// extname() method

console.log("\n------------------ extname() ------------------\n");

const extname1 = path.extname("photo.png");
console.log(extname1);

const extname2 = path.extname("C:/Users/file.txt");
console.log(extname2);

const extname3 = path.extname("archive.tar.gz");
console.log(extname3);
