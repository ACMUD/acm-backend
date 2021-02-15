import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { resolvers } from './resolvers';

export async function createApolloServer() {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers as [Function, ...Function[]],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
}
