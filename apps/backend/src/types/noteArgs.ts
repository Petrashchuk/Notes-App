import {ArgsType, Field} from "type-graphql";

@ArgsType()
export class NoteArgs {
    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    content?: string;

    @Field(() => Date,{ nullable: true })
    date?:Date; //todo
}