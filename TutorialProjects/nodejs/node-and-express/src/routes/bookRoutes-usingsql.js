const express = require("express");
const sql = require("mssql");
const debug = require("debug")("app:bookRoutes");

const bookRouter = express.Router();

function router(nav) {


  // Set up a route for our book router to use
  bookRouter.route('/')
    .get((req, res) => {
      // Instead of using promises, we will use async await, and we can 'make things' async await by wrapping it in
      // an IIFE
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query("select * from books");
        
        books = recordset;
        debug(recordset);
        
        res.render("bookListView", { title: "All Books", nav, books });
      }());
    });


  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id = @id');
        debug("/", id, " recordset = ", recordset);
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      debug(req.book);
      res.render("bookView", { title: req.book.title, nav, book: req.book });
    });

  return bookRouter;
}
module.exports = router;
