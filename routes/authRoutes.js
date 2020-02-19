const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { validate } = require('../models/User');
const auth = require('../middlewares/Auth');

module.exports = app => {
  app.post('/auth/register', (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(400).send(info.message);
      } else {
        console.log(user);
        req.logIn(user, err => {
          console.log('user created in db');
          res.status(200).send({ message: 'user created' });
        });
      }
    })(req, res, next);
  });

  app.post('/auth/login', (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(400).send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({
            email: user.email
          }).then(user => {
            const token = jwt.sign({ id: user.email }, jwtSecret.secret, {
              expiresIn: 60 * 60
            });
            res.status(200).send({
              auth: true,
              token: token,
              message: 'user found & logged in'
            });
          });
        });
      }
    })(req, res, next);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect('/dashboard');
    }
  );

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', auth, (req, res) => {
    User.findOne({
      email: req.user
    }).then(user => {
      res.send(user);
    });
  });
};
