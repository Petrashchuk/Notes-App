import { MongoDataSource } from 'apollo-datasource-mongodb';
import { NoteDb } from '../types';



//todo ts-ignore
export class Notes extends MongoDataSource<NoteDb> {
    async create(note:string) {
        // @ts-ignore
        const createdNote = new this.model({content:note});
        await createdNote.save();
        return createdNote;
    }

    async update(note: NoteDb) {
        // @ts-ignore
        return await this.model.findByIdAndUpdate(note.id, note, {new: true});
    }

    async remove(id: string) {
        // @ts-ignore
        return await this.model.findByIdAndRemove(id);
    }

    // todo get all by User
    async getAll() {
        // @ts-ignore
        return await this.model.find().exec();

    }

    async get(id: string) {
        // @ts-ignore
        return this.model.findById(id);
    }
}
