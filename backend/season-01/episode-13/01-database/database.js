const { MongoClient } = require("mongodb");

// connection uri
const uri =
  "mongodb+srv://namasteNode:namasteNodePass@namastenode.jqcz9u9.mongodb.net/?appName=namasteNode";
const client = new MongoClient(uri);

// database name
const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");


  // insert
  const data = {
    firstName : "Atul",
    lastName : "Chandel",
    city : "Indore"
  }

  const insertResult = await collection.insertMany([data]);
  console.log('Inserted documents =>', insertResult);

  
  // read
  const findResult = await collection.find({}).toArray();
  console.log("Found documents => ", findResult);



  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
