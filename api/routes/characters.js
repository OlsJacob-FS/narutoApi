//require express
const express = require("express");
const router = express.Router();

const Character = require("../models/character");

//Middleware::
const getCharacter = async (req, res, next) => {
  let character;
  try {
    character = await Character.findById(req.params.id);
    if (character == null) {
      return res.status(404).json({ message: "Cannot find character" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.character = character;
  next();
};
//GET, GET ALL, POST, PATCH, DELETE
//GET ALL
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BY ID
router.get("/:id", getCharacter, async (req, res) => {
  try {
    res.json(res.character);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST
router.post("/", async (req, res) => {
  const character = new Character(req.body);
  try {
    const savedCharacter = await character.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PATCH
router.patch("/:id", getCharacter, async (req, res) => {
  if (req.body.name != null) {
    res.character.name = req.body.name;
  }
  if (req.body.age != null) {
    res.character.age = req.body.age;
  }
  if (req.body.village != null) {
    res.character.village = req.body.village;
  }
  try {
    const updatedCharacter = await res.character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE BY ID
router.delete("/:id", getCharacter, async (req, res) => {
  try {
    await res.character.deleteOne();
    res.json({ message: "Character deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
