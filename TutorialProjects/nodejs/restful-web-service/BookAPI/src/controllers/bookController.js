const debug = require('debug')('app:bookController');
const util = require('util');

function bookController(Book) {

  const post = function post(req, res) {
    const book = new Book(req.body);    
    if (!req.body.title) {
      console.log("Req.body: " + util.inspect(req.body));
      res.status(400);
      res.send("Title is required");   
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };
  const get = function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.read) {
      query.read = req.query.read;
    }
    if (req.query.author) {
      query.author = req.query.author;
    }
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let returnBooks = [];
        books.forEach((element, index, array) => {
          let newBook = element.toJSON();
          newBook.links = {};
          newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
          returnBooks.push(newBook);
        });
        res.json(returnBooks);
      }
      return 1;
    });
  };

  return {
    post,
    get,
  }
}

module.exports = bookController;
