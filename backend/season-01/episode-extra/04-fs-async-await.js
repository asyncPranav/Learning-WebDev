const fs = require("fs");
const path = require("path");

const fileName = "fsAsyncAwait.txt";
const filePath = path.join(__dirname, fileName);
const dir = __dirname;

// read directory
const readFolder = async () => {
  try {
    const files = await fs.promises.readdir(dir);
    console.log(files);
  } catch (error) {
    console.log(error);
  }
};
readFolder();

// write file
const writeFile = async () => {
  try {
    await fs.promises.writeFile(
      filePath,
      "text written by writeFile() function.",
      "utf8"
    );
    console.log("file written successfully.");
  } catch (error) {
    console.log(error);
  }
};
writeFile();

// read file
const readFile = async () => {
  try {
    const data = (await fs.promises.readFile(filePath)).toString();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
readFile();
