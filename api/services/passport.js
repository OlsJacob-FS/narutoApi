//require passport/ passport jwt
const passport = require("passport");
let ExtractJwt = require("passport-jwt").ExtractJwt,
  JwtStrategy = require("passport-jwt").Strategy,
  localStrategy = require("passport-local");

const User = require("../models/user");
const config = require("../config");

const localOptions = {
  usernameField: "email",
};
localStrategy = new localStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function (error, isMatch) {
      if (error) {
        return done(error, false);
      }
      if (!isMatch) {
        return done(null, user);
      } else {
        done(null, false);
      }
    });
  });
});
const jwtOptions = {
  secretOrKey: config.secert,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

JwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub).then((user) => {
    if (user) {
      return done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localStrategy);
passport.use(JwtStrategy);
