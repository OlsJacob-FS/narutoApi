//require express
const express = require("express");

const passport = require("passport");
const passportService = require("../services/passport");
const requireLogin = passport.authenticate("local", { session: false });

const router = express.Router();
//Authentaction Controller
const AuthController = require("../controllers/authentacationController");
//GET, GET ALL, POST, PATCH, DELETE
//GET ALL
router.post("/", AuthController.signup);
router.post("/signin", requireLogin, AuthController.signin);

module.exports = router;
