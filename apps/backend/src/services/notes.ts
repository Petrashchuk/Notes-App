import { Note } from "../types";
import { Note as NoteModel } from "../model/note";
class Notes<T extends typeof NoteModel> {
  private readonly Model: T;
  constructor(model: T) {
    this.Model = model;
  }

  async create(note: Note) {
    const createNote = new this.Model(note);
    await createNote.save();

    return createNote;
  }
  async findById(id: string) {
    return this.Model.findById(id);
  }
}

export default new Notes(NoteModel); //todo
