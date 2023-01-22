import { Resolver, Root, Ctx, Query, Mutation, Args, Arg } from 'type-graphql'
import { Note, NoteArgs } from '../types'
import NotesService from '../services/notes'

@Resolver(() => Note)
export class NotesResolver {
  @Mutation(() => Note)
  async create(
    @Args(() => NoteArgs) note: NoteArgs,
  ): Promise<Note | undefined> {
    try {
      const createdNote = await NotesService.create(note);
      return createdNote as Note
    } catch (e: unknown) {
      console.error(e)
    }
  }
  // @Query(() => [Note])
  // async notes(): Promise<Note[]> {
  //   return data;
  // }

  @Query(() => Note)
  async note(@Arg('id', () => String) id: string): Promise<Note> {
    try {
      const response = await NotesService.findById(id)
      return response as Note
    } catch (e: unknown) {
      console.error(e)
    }

  }
}
