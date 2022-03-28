const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();
const axios = require("axios");

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  "local",
  new LocalStrategy({
    usernameField: "email"
  }, async function (
    username,
    password,
    done
  ) {
    try {
      const user = await User.findOne({
        email: username
      }).select(
        "-__v -createdAt -updateAt "
      );
      if (user === null) {
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      return done(err);
    }
  })
);

let accessOptions = {};
accessOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
accessOptions.secretOrKey = process.env.ACCESS_TOKEN_SECRET || "gaming_social";
passport.use(
  "jwt-access",
  new JwtStrategy(accessOptions, function (jwt_payload, done) {
    User.findOne({
      _id: jwt_payload.payload.user
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }).select("-__v -createdAt -updatedAt -password");
  })
);

let refreshOptions = {};
refreshOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
refreshOptions.secretOrKey =
  process.env.REFRESH_TOKEN_SECRET || "gaming_social";
passport.use(
  "jwt-refresh",
  new JwtStrategy(refreshOptions, function (jwt_payload, done) {
    User.findOne({
      _id: jwt_payload.payload.user
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }).select("-__v -createdAt -updatedAt -password");
  })
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});