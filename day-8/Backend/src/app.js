/* 
    -   server ko create
*/

const express = require("express");
const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

/* 
    -   POST /api/notes
    -   create new note and save data in mongodb
    -   req.body = {title, description}
*/

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

/* 
  - GET /api/notes
  - Fetch all the notes data from mongodb and send them in the reponse
*/

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

/* 
  - Delete /api/notes/:id
  - Delete note with the id from req.params
*/

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/* 
    - PATCH /api/notes/:id
    - updated the description of the not id
    - req.body - {description}
*/

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "note updated successfully",
  });
});

module.exports = app;
