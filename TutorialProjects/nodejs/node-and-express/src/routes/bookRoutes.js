const express = require("express");
const debug = require("debug")("app:bookRoutes");
const { MongoClient, ObjectID } = require('mongodb');
const bookService = require('../services/goodReadService');

const bookRouter = express.Router();

function router(nav) {  
  const { getIndex, getById, middleware } = require('../controllers/bookController')(bookService, nav);
  // If we want all book related content to be accessible only to signed in users we
  // can use middle where on the router aswell as a route, using .user
  //bookRouter.use(middleware);

  // Set up a route for our book router to use
  bookRouter.route('/')
    .get(getIndex);


  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}
module.exports = router;
