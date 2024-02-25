import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';


// Loading environment variables from .env file
dotenv.config();

// Retrieving MongoDB string from environment variables
const connectionString = process.env.ATLAS_URI || '';

// Creating a new MongoClient instance with a provided connection string info
const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();      // Attempting to connect to the Mongo server
} catch (e) {
  console.error(e);                   // load and show any connecting errors
}

let db = conn.db('sample_training');

// Create a single-field index on class_id.
// Create a single-field index on learner_id.
// Create a compound index on learner_id and class_id, in that order, both ascending.


try {
  await db.collection('grades').createIndex({ "class_id": 1 });      // Create a single-field index on class_id
  await db.collection('grades').createIndex({ "learner_id": 1 });  // Create a single-field index on learner_id.
  await db.collection('grades').createIndex({ "learner_id": 1, "class_id": 1 });  // Create a compound index on learner_id and class_id, in that order, both ascending.
} catch (e) {
  console.error(e); 
}


// Create the following validation rules on the grades collection:
    // Each document must have a class_id field, which must be an integer between 0 and 300, inclusive.
    // Each document must have a learner_id field, which must be an integer greater than or equal to 0.




export default db;