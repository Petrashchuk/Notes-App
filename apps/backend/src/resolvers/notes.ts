import { Resolver, Ctx, Query, Mutation, Args, Arg } from 'type-graphql';
import { Note, NoteArgs,NoteDb } from '../types';
import { IDataSources } from '../context';


@Resolver(() => Note)
export class NotesResolver {
	@Mutation(() => Note)
	async create(
		@Arg('content',() => String) content: string,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.create(content);
		} catch (e: unknown) {
			console.error(e);
		}
	}

	@Mutation(() => Note)
	async update(
		@Args(() => NoteArgs) note: NoteDb,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.update(note);
		} catch (e: unknown) {
			console.error(e);
		}
	}

	@Mutation(() => Note)
	async remove(
		@Arg('id',() => String) noteId: string,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.remove(noteId);
		} catch (e: unknown) {
			console.error(e);
		}
	}

	@Query(() => [Note])
	async notes(
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			// todo by user id;
			return await dataSources.notes.getAll();
		} catch (e: unknown) {
			console.error(e);
		}
	}

	@Query(() => Note)
	async note(
		@Arg('id', () => String) noteId: string,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.get(noteId);
		} catch (e: unknown) {
			console.error(e);
		}
	}
}
