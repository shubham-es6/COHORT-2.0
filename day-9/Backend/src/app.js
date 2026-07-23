/* 
server ko create karna
*/

const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");
const { log } = require("console");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

/* 
    -   POST /api/notes
    -   create new note and save data in mongodb
    -   req.body = {title, description}
*/

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/* 
    -   GET /api/notes
    -   Fetch all the notes data from mongodb and send them in the response
*/

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    Message: "Notes fetched successfully",
    notes,
  });
});

/* 
    -   Delete /api/notes/:id
    -   Delete note with the id from req.params
*/

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully.",
    note,
  });
});

/* 
    -   PATCH /api/notes/:id
    -   update the description of the note by id
    -   req.body = {description}
*/

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  const note = await noteModel.findByIdAndUpdate(
    id,
    {
      description,
    },
    {
      returnDocument: "after",
    },
  );

  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
