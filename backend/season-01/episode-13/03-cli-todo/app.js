const readline = require("readline");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://namasteNode:namasteNodePass@namastenode.jqcz9u9.mongodb.net/?appName=namasteNode";
const client = new MongoClient(uri);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to DB and start app
async function main() {
  await client.connect();
  console.log("MongoDB connected");
  showMenu(); // start menu
}

// Show Menu
async function showMenu() {
  console.log("\n----------------TODO-APP----------------\n")
  console.log("1. Add Todo");
  console.log("2. List Todos");
  console.log("3. Done Todo");
  console.log("4. Delete Todo");
  console.log("5. Exit");

  const choice = await ask("Enter your choice: ");

  switch (choice) {
    case "1":
      await addTodo();
      break;
    case "2":
      await listTodo();
      break;
    case "3":
      await doneTodo();
      break;
    case "4":
      await deleteTodo();
      break;
    case "5":
      console.log("Exiting...");
      rl.close();
      await client.close();
      return; // exit
    default:
      console.log("Invalid choice, try again");
  }

  showMenu(); // loop menu after operation
}

// Wrap rl.question in a promise to use await
function ask(questionText) {
  return new Promise((resolve) => {
    rl.question(questionText, (input) => resolve(input));
  });
}

// Add Todo
async function addTodo() {
  const text = await ask("Enter todo text: ");
  const db = client.db("todoApp");
  const todos = db.collection("todos");

  await todos.insertOne({
    text,
    completed: false,
    createdAt: new Date(),
  });

  console.log(`Added todo: ${text}`);
}

// List Todos
async function listTodo() {
  const db = client.db("todoApp");
  const todos = db.collection("todos");

  const all = await todos.find().toArray();

  if (all.length === 0) {
    console.log("No todos found");
  } else {
    console.log("\nYour Todos:");
    all.forEach((t, i) => {
      console.log(`${i + 1}. ${t.text} [${t.completed ? "✅" : "❌"}]`);
    });
  }
}

// Mark Todo as done
async function doneTodo() {
  const text = await ask("Enter todo text to mark as done: ");
  const db = client.db("todoApp");
  const todos = db.collection("todos");

  const result = await todos.updateOne({ text }, { $set: { completed: true } });

  if (result.matchedCount === 0) {
    console.log("Todo not found");
  } else {
    console.log(`Todo marked as done: ${text}`);
  }
}

// Delete Todo
async function deleteTodo() {
  const text = await ask("Enter todo text to delete: ");
  const db = client.db("todoApp"); // fixed DB name
  const todos = db.collection("todos");

  const result = await todos.deleteOne({ text });

  if (result.deletedCount === 0) {
    console.log("Todo not found");
  } else {
    console.log(`Todo deleted: ${text}`);
  }
}

main().catch(console.error);
