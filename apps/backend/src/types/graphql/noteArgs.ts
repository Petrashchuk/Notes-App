import {ArgsType, Field} from "type-graphql";

@ArgsType()
export class NoteArgs {
    @Field(() => String)
    id: string;

    @Field(() => String)
    content: string;
}