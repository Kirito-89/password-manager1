const express = require('express')
const dotenv=require('dotenv')
dotenv.config()
const bodyparser=require("body-parser")
const cors=require("cors")
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';

const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
// console.log(process.env.MONGO_URI) 
client.connect();
//get api
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//post api
app.post('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
  res.send({seccess:true,result:findResult})
})
app.delete('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(password);
  res.send({seccess:true,result:findResult})
})
//delete a password
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})