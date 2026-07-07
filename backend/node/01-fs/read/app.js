const fs = require("node:fs");

// Asynchronous reading using callback
fs.readFile("./async.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
console.log("Asynchronous part ends here...\n");

// Without passing encoding option, we get buffer
fs.readFile("./async.txt", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
  console.log(data.toString());
});

// Synchronous reading

const syncReadFileData = fs.readFileSync("./sync.txt", "utf-8");
console.log(syncReadFileData);

const syncReadFileBuffer = fs.readFileSync("./sync.txt");
console.log(syncReadFileBuffer);

console.log("Synchronous reading ends here...\n");

// Modern promise approach

const promiseReadFile = async () => {
  try {
    const data = await fs.promises.readFile("./promise.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
promiseReadFile();

// Read json data

const readJson = async () => {
  try {
    const data = await fs.promises.readFile("./user.json", "utf-8");
    console.log(data); // print raw string
    const parsedData = JSON.parse(data); // convert json to javascript array/object
    console.log(parsedData); 
  } catch (err) {
    console.error(err);
  }
};
readJson();
