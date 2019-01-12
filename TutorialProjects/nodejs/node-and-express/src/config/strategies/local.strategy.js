const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const chalk = require('chalk');
const debug = require("debug")("app:local.strategy");

module.exports = function localStrategy() {
  passport.use(new Strategy(
    // First arg object, tells the stratgey what values to look for and pull our
    // 'user' to define a user with
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    // second arg is function that takes the 'pulled' values and actually
    // defines a user with them
    (username, password, done) => {
      // validate user etc....     
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function addUser() {
        let client = {};
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const collection = await db.collection('users');          
          const user = await collection.findOne({ username });
          debug(chalk.blue("user: "), user, chalk.red("un ps: "), username, password);

          // If given password matches password in database, no error, return users
          if (user.password === password) {
            done(null, user);
          }
          // Else, also still no 'error' it was just an unsuccesful login, so return false
          else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
      }());
    },
  ));
};
