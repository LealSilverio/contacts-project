const express = require('express');
const cors = require('cors');
const db = require('./db/database')

const port = process.env.PORT || 5000;
const app = express();

app
    .use('/', require('./routes/index'))
    .use(cors);

// Connect to the MongoDB server
db.connectDB((err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
