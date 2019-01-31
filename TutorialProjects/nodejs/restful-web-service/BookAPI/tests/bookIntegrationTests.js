const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const debug = require('debug')("tests:bookIntTest");

const app = require('../app.js');
const Book = require('../src/models/bookModel');

const agent = request.agent('localhost:3050/');

describe("Book CRUD Tests", () => {
  it("Should allow book to be posted and return an _id", (done) => {
    const bookPost = {title:"TESTY", author: "TESTER1", genre: "TEST" };
    agent.post('api/books/book')
      .send(bookPost)
      .expect(201)
      .end((err, results) => {    
               
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach((done) => {
    Book.deleteMany().exec();
    done();
  });
});
