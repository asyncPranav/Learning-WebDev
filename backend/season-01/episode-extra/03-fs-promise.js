const fs = require("fs");
const path = require("path");

const dir = __dirname;
const fileName = "fsPromise.txt";
const filePath = path.join(__dirname, fileName);

fs.promises
  .readdir(dir)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));


fs.promises
  .readFile(filePath).then((data) => {
    console.log("File data:", data.toString());
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });

  
