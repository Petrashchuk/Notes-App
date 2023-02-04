/* eslint-disable camelcase */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Note {
    @Field(() => String)
    id: string;

    @Field(() => String)
    content: string;

    @Field(() => Date)
    created:Date;

    @Field(() => Date)
    updated:Date;
}
