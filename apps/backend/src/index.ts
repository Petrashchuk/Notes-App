import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { connectDb } from "./db";
const PORT = 4000;

(async () => {
  const server = new ApolloServer({
    schema: buildSchemaSync({
      resolvers: resolvers,
      validate: false, // todo
    }),

  });
  await connectDb();
  server.listen(PORT).then(() => {
    console.log(`🚀Server ready at: ${PORT}`);
  });
})();
