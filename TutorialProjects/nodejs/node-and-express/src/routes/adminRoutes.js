const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const books = [{
  title: "Harry Potter",
  author: "J. K. Rowling",
  extId: 3,
  genre: "Magic",
  id: "1",
},
{
  title: "1984",
  author: "George Orwell",
  extId: 40961427,
  genre: "Sci-fi",
  id: "2",
},
{
  title: "The Da Vinci Code",
  author: "Dan Brown",
  genre: "Mystery",
  extId: 968,
  id: "3",
},
{
  title: "The Hunger Games",
  author: "Suzanne Collins",
  genre: "Adventure",
  extId: 2767052,
  id: "4",
},
{
  title: "Wuthering Heights",
  author: "Emily Brontë",
  genre: "Magic",
  extId: 6185,
  id: "5",
},
{
  title: "Brave New World",
  author: "Aldous Huxley",
  genre: "Sci-fi",
  extId: 5129,
  id: "6",
},
{
  title: "The Odyssey",
  author: "Homer",
  genre: "Classic",
  extId: 17996971,
  id: "7",
},
{
  title: "Catch-22",
  author: "Joseph Heller",
  genre: "Thriller",
  extId: 168668,
  id: "8",
},
{
  title: "Mockingjay",
  author: "Suzanne Collins",
  genre: "Cultural",
  extId: 7260188,
  id: "9",
},
{
  title: "Moby Dick",
  author: "Herman Melville",
  genre: "Fiction",
  extId: 153747,
  id: "10",
}];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbtitle = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          debug("Attempting to open connection");
          client = await MongoClient.connect(url);
          debug("connected to mongodb");
          const db = client.db(dbtitle);
          const response = await db.collection('books').insertMany(books);
          res.redirect('/');
        } catch (err) {
          debug(err.stack);
          res.send("OOPS!");
        }
      }());
    });
  return adminRouter;
}

module.exports = router;
