/* eslint-disable camelcase */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Note {
    @Field(() => String)
    id?: string;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    content?: string;

    @Field(() => Date,{ nullable: true })
    date?:Date; //todo
}
