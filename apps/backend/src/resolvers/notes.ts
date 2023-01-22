import { Resolver, Ctx, Query, Mutation, Args, Arg } from 'type-graphql';
import { Note, NoteArgs } from '../types';
import { IDataSources } from '../context';

@Resolver(() => Note)
export class NotesResolver {
	@Mutation(() => Note)
	async create(
		@Args(() => NoteArgs) note: NoteArgs,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.createNote(note);
		} catch (e: unknown) {
			console.error(e);
		}
	}
	// @Query(() => [Note])
	// async notes(): Promise<Note[]> {
	//   return data;
	// }

	@Query(() => Note)
	async note(
		@Arg('id', () => String) id: string,
		@Ctx('dataSources') dataSources: IDataSources
	): Promise<Note | undefined> {
		try {
			return await dataSources.notes.getNote(id);
		} catch (e: unknown) {
			console.error(e);
		}
	}
}
