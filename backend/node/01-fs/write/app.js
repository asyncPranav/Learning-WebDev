const fs = require("node:fs");

// Asynchronous writing using callback

fs.writeFile("./asyncWrite.txt", "Hello from async write!", (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Asynchronous file written successfully!");
});

console.log("Asynchronous writing ends here...\n");






// Synchronous writing

fs.writeFileSync("./syncWrite.txt", "Hello from synchronous write!");

// We use try-catch for error handling in synchronous writing

try {
  fs.writeFileSync("./syncWrite.txt", "Hello from synchronous write!");
} catch (err) {
  console.error(err);
}

console.log("Synchronous file written successfully!");
console.log("Synchronous writing ends here...\n");





// Modern promise approach

const promiseWriteFile = async () => {
  try {
    await fs.promises.writeFile(
      "./promiseWrite.txt",
      "Hello from promise-based write!",
    );

    console.log("Promise-based file written successfully!");
  } catch (err) {
    console.error(err);
  }
};

promiseWriteFile();

// Write JSON data

const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    age: 25,
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    age: 28,
  },
];

const writeJson = async () => {
  try {
    await fs.promises.writeFile(
      "./user.json",
      JSON.stringify(users, null, 2), // Convert JS array/object to JSON string
    );

    console.log("JSON file written successfully!");
  } catch (err) {
    console.error(err);
  }
};

writeJson();






// Append data to an existing file

const appendData = async () => {
  try {
    await fs.promises.appendFile(
      "./asyncWrite.txt",
      "\nThis line was appended.",
    );

    console.log("Data appended successfully!");
  } catch (err) {
    console.error(err);
  }
};

appendData();
