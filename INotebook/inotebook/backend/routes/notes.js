const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const { Schema } = mongoose;

// Get All the notes : Get "/api/notes/fetchallnotes"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });

  res.json(notes);
});

// Add a new note using Post. Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  }
);

// Update a note using Post. Login Required
// Delete a note
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      // Find the note to be deleted
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Check if the user is authorized to delete the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not authorized to delete this note" });
      }

      // Delete the note
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Update a note using Put. Login Required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (tag) updatedFields.tag = tag;

    try {
      // Find the note to be updated
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Check if the user is authorized to update the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not allowed to update this note" });
      }

      // Update the note
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


module.exports = router;
