const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
//Assign port from host provider || run on port 5000
const PORT = process.env.PORT || 8000;
const characterRouter = require("./routes/characters");
//connect .env file with db
const DATABASE_URL = process.env.DATABASE_URL;
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use("/api/v1/characters", characterRouter);

app.use(express.static(path.join(__dirname, "../reactjs/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
