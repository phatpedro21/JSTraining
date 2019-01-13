const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:route:bookRouter');

const bookRouter = express.Router();


module.exports = function router(Book) {

  const bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .get(bookController.get);

  bookRouter.route('/book')
    .get(bookController.get)
    .post(bookController.post);
  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      Book.findById(id, (err, book) => {
        if (err) {
          res.status(500).send(err);
        } else if (book) {
          req.book = book;
          next();
        } else {
          res.status(404).send("Book not found");
        }
      });
    })
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          res.status(500).send('Error patching book');
        } else {
          res.json(req.book);
        }
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.book[p] = req.body[p];
      }
      req.book.save((err) => {
        if (err) {
          res.status(500).send('Error patching book');
        } else {
          res.json(req.book);
        }
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("Book deleted successfully");
        }
      });
    });
  return bookRouter;
};
