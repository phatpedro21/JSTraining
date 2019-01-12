// Controllers should be a list of functions which handle each 'action' on a router
// Essentially creating an API for our route behavious
const debug = require("debug")("app:bookController");
const { MongoClient, ObjectID } = require('mongodb');



module.exports = function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();
        res.render('bookListView', {
          title: "Books", nav, books, loggedIn: (typeof req.user !== 'undefined'),
        });
      } catch (err) {
        debug(err.stack);
        res.send("OOPS!");
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });

        // Fetch book details from goodread to populate page
        book.details = await bookService.getBookById(book.extId);

        res.render('bookView', {
          title: "Books", nav, book, loggedIn: (typeof req.user !== 'undefined'),
        });
      } catch (err) {
        debug(err.stack);
        res.send("OOPS!");
      }
      client.close();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
};
