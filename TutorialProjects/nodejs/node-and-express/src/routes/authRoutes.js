const express = require("express");
const { MongoClient } = require('mongodb');
const debug = require("debug")("app:authRoutes");
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/')
    .get((req, res) => {
      res.send("AUTHENTICADO?1");
    });

  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function addUser() {
        let client = {};
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const collection = await db.collection('users');
          const user = { username, password };
          const { ops } = await collection.insertOne(user);
          debug(ops);
          // log user in (with .login added by the passport middleware) and THEN redirect
          // to their profile
          req.login(ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', { title: "Sign In", nav, blank: null });
    })
    // Passport hase built in 'way' to handle a sign in, and we want to use the local 
    // strategy here, and if it succeeds redirect one place ,else to another place
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/profile')
    // Always check if user is signed in if trying to access profile, redirect if not, continue is yes
    .all((req, res, next) => {
      // req.user should only exist if someone is signed in
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  authRouter.route('/logOut')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  return authRouter;
}

module.exports = router;
