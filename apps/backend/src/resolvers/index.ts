import { BuildSchemaOptions } from 'type-graphql'

import { NotesResolver } from "./notes";


type Resolvers = BuildSchemaOptions['resolvers']

export const resolvers: Resolvers = [
    NotesResolver
]
