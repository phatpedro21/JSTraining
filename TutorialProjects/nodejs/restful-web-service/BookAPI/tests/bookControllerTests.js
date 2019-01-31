const should = require('should');
const sinon = require('sinon');

describe("Book Controller Tests", () => {
  describe("Testing Post", () => {
    it("should not allow empty title on post", () => {
      const Book = function (book) { this.save = function () { } };
      const req = {
        body: {
          author: "MEE"
        }
      }
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      }

      const bookController = require('../src/controllers/bookController')(Book);
      bookController.post(req, res);
      res.status.calledWith(400).should.equal(true, "Bad status " + res.status.args[0][0]);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
