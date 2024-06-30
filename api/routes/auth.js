//require express
const express = require("express");
const router = express.Router();
//Authentaction Controller
const AuthController = require("../controllers/authentacationController");
//GET, GET ALL, POST, PATCH, DELETE
//GET ALL
router.post("/", AuthController.signup);

module.exports = router;
