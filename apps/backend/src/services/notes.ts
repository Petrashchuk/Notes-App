import { Note } from '../types';
import { MongoDataSource } from 'apollo-datasource-mongodb';

//todo ts-ignore
export class Notes extends MongoDataSource<Note> {
	async createNote(note: Note) {
		// @ts-ignore
		const createdNote = new this.model(note);
		await createdNote.save();
		return createdNote as Note;
	}
	async getNote(id: string) {
		// @ts-ignore
		return this.model.findById(id) as Note;
	}
}
