const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores a user in session
  passport.serializeUser((user, done) => {
    // Calls callback with 'error', we are saying this is null, and then storing entire
    // user in the session
    done(null, user);
  });
  // Retrieves a user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // As in future we may want to make use of a number of passport strategies,
  // we will pull out the set up for these to make code tidier.

};
