import mongoose from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema({
  name: String,
  content: String,
  date: {
    type: Date,
    require: false,
  },
});

export const Note = model("Note", noteSchema);
