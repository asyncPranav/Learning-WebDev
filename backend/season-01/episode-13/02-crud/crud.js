const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://namasteNode:namasteNodePass@namastenode.jqcz9u9.mongodb.net/?appName=namasteNode";

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  console.log("MongoDB connected");

  const db = client.db("HelloWorld");
  const users = db.collection("User");

  // create
  console.log("\n--------------Creating user--------------\n");
  const created = await users.insertOne({
    name: "Vageesh",
    age: 34,
    course: "MCA",
  });

  console.log("acknowledged : ", created.acknowledged);
  console.log("insertedId : ", created.insertedId);


  // read
  console.log("\n--------------Reading Users--------------\n");
  const all = await users.find().toArray();
  console.log(all);

  // update
  console.log("\n--------------Updating User--------------\n");
  // await users.updateOne({ name: "Atul" }, { $set: { name: "Ayush" } });
  const result = await users.updateOne(
    { name: "Vageesh" },
    { $set: { name: "Atul" } },
  );

  console.log("matchFound : ", result.matchedCount); // how many found
  console.log("modifiedCount : ", result.modifiedCount); // how many updated

  // print final all users
  console.log("\n--------------Final All Users--------------\n");
  console.log(await users.find().toArray());

  // delete
  console.log("\n--------------Deleting user--------------\n");
  const deleted = await users.deleteOne({ name: "Atul" });
  console.log("acknowledged : ", deleted.acknowledged);
  console.log("deletedCount :", deleted.deletedCount);

  client.close();
}

main();
