import { writable, type Writable } from "svelte/store";
import dayjs from 'dayjs';

export type Note = {
  name: string;
  created: Date;
  content: string;
  updated: Date;
  id: string;
}

type NoteUpdate = Partial<Omit<Note, 'id' | 'created' | 'updated'>>

interface NotesStore extends Writable<Note[]> {
  init: () => Promise<void>;
  updateNote: (id: string, updatedNote: NoteUpdate) => void;
}

const createNotesStore = (): NotesStore => {
  const store = writable<Note[] | []>([]);

  return {
    ...store,
    init: () => {
      return Promise.resolve([
        { id: 'id1', name: 'name', created: new Date(), updated: new Date(), content: '<h1>name</h1>' },
        { id: 'id2', name: 'name2', created: new Date(), updated: new Date(), content: '<h1>name2</h1>' },
        { id: 'id3', name: 'name3', created: new Date(), updated: new Date('02/03/2023'), content: '<h1>name3</h1>' },
        { id: 'id4', name: 'name4', created: new Date(), updated: new Date('02/03/2023'), content: '<h1>name4</h1>' },
        { id: 'id5', name: 'name5', created: new Date(), updated: new Date('02/03/2023'), content: '<h1>name5</h1>' }
      ]).then(store.set);
    },
    updateNote: (updateId: string, updatedNote: NoteUpdate) => {
        store.update((notes) => {
          const note = notes.find(note => note.id === updateId);

          if (!note) return notes;

          if (dayjs().diff(note.updated, 'minute') > 1) {
            note.updated = new Date();
          }

          note.name = updatedNote.name ?? '';
          note.content = updatedNote.content ?? '';

          return notes;
        });
    }

  };
};

export const notesStore = createNotesStore();
