import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();
//Body parser?

//Get all route
router.get('/', async (req, res) => {
  let collection = await db.collection('grades');
  let result = await collection.find({}).limit(10).toArray();
  res.json(result);
});

//Create POST new grade
router.post('/', async (req, res) => {
  let collection = await db.collection('grades');
  let newDocument = req.body;

  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);

  res.json(result).status(201);
});

// Get a single grade entry
router.get('/:id', async (req, res) => {
  let collection = await db.collection('grades');
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send('Not found');
  else res.send(result).status(200);
});

//Get a learner by ID
router.get('/learner/:learnerID', async (req, res) => {
  let collection = await db.collection('grades');
  let query = { learner_id: Number(req.params.learnerID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send('Not found');
  else res.send(result).status(200);
});

//Delete a learner by id
router.delete('/learner/:learnerID', async (req, res)=>{
  let collection = await db.collection('grades');
  let query = { learner_id: Number(req.params.learnerID) };
  let result = await collection.deleteMany(query)

  if (result.deletedCount === 0) res.status(404).send('Not found');
  else res.send(result).status(200);
})

//
//Get a class by class_id
router.get('/class/:classID', async (req, res) => {
  let collection = await db.collection('grades');
  let query = { class_id: Number(req.params.classID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send('Not found');
  else res.json(result).status(200);
});

//Update a class_id PATCH
router.patch('/class/:classID', async (req, res) => {
  let collection = await db.collection('grades');
  let query = { class_id: Number(req.params.classID) };

  let result = await collection.updateMany(query, {
    $set: { class_id: req.body.class_id },
  });

  console.log(result)
  if (result.upsertedCount === 0 ) res.status(404).send('Not found');
  else res.json(result).status(200);
});

export default router;