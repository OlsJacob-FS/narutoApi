//Require Model
const User = require("../models/user");
//require Paclages:
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getDate();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    config.secert
  );
};
exports.signin = (req, res, next) => {
  const user = req.user;
  res.send({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please Provide your email and password" });
  }

  User.findOne({ email: email }).then((exsistingUser) => {
    if (exsistingUser) {
      res.status(422).json({ error: "Email already in use" });
    }

    const user = new User({
      email,
      password,
    });
    user.save().then(() => {
      res.json({ user_id: user._id, token: tokenForUser(user) });
    });
  });
};
