const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');
const bodyparser = require('body-parser');

mongoose.connect(process.env.DBHOST, { useNewUrlParser: true });


const db = mongoose.connection;
db.on("open", () => {
  debug("CONNECTED");
});
const app = express();
const port = process.env.PORT || 3000;

const Book = require('./src/models/bookModel');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

// const bookRouter = require('./src/routes/bookRouter');
const bookRouter = require('./src/routes/bookRouter')(Book);
app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(port);


module.exports = app;
