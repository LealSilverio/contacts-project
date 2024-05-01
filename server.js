const express = require('express');
const { MongoClient } = require('mongodb');
const ___ = require('dotenv'); 
const app = express();


app.use('/', require('./routes/index'));

const client = new MongoClient(process.env.MONGODB_URI);

// Connect to the MongoDB server
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB database');

        app.listen(5000);
        console.log(`Web Server is listening at port 5000`);
    } catch (error) {
        console.error('Error connecting to the MongoDB database:', error);
    }
}

connectDB();
