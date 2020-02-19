const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwtSecret = require('../config/jwtConfig');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

const BCRYPT_SALT_ROUNDS = 12;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      console.log(profile);

      if (existingUser) {
        if (existingUser.accepted) {
          return done(null, existingUser);
        } else {
          return done(null, null);
        }
      }

      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }).save();
      return done(null, null);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });
      console.log('login by facebook');
      console.log(profile);
      if (existingUser) {
        if (existingUser.accepted) {
          return done(null, existingUser);
        } else {
          return done(null, null);
        }
      } else {
        const user = await new User({
          facebookId: profile.id,
          name: profile.displayName
        }).save();
        return done(null, null);
      }
    }
  )
);

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return done(null, false, { message: 'User already registered.' });
      } else {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const user = await new User({
          email,
          password: hashedPassword
        }).save();
        return done(null, user);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const match = await bcrypt.compare(password, existingUser.password);
        if (match !== true) {
          console.log('passwords do not match');
          return done(null, false, {
            message: 'bad username or password'
          });
        } else {
          console.log('user found & authenticated');
          // note the return needed with passport local - remove this return for passport JWT
          return done(null, existingUser);
        }
      } else {
        return done(null, false, {
          message: 'bad username or password'
        });
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id
        }
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
