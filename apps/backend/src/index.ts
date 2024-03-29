import 'reflect-metadata';
import { Collection } from "apollo-datasource-mongodb";
import { buildSchemaSync } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { resolvers } from './resolvers';
import { connectDb } from './db';
import { Notes } from './services';
import { Note } from './model';
import { NoteDb } from "./types";


const PORT = 4000;

(async () => {
	await connectDb();
	const server = new ApolloServer({
		schema: buildSchemaSync({
			resolvers: resolvers,
			validate: false // todo
		}),
		dataSources: () => ({
			notes: new Notes(Note as unknown as Collection<NoteDb>)
		})
	});
	server.listen(PORT).then(() => {
		console.log(`🚀Server ready at: ${PORT}`);
	});
})();
