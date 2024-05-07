const express = require('express');
const cors = require('cors');
const db = require('./db/database');

const port = process.env.PORT || 5000;
const app = express();

app
  .use(cors())
  .use('/', require('./routes'))
;

// Connect to the MongoDB server
db.connectDB((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Listening on port ${port}`);
    }
});
