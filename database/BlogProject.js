import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';  // ES6 import syntax
dotenv.config();

// Connection URL
const url = process.env.EXPRESS_MONGODB_CONNECTION_STRING || "";
try{
  var client = new MongoClient(url);
}catch{
  console.log('mongodb connectionn error')
}
// const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'BlogProject';

async function users() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // the following code examples can be pasted here...

  return collection;
}

async function posts() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Blogs');

  // the following code examples can be pasted here...

  return collection;
}


export { users, posts, dbName }