import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const typeDefs = gql`
  type Query {
    test: String!
  }

  type Mutation {
    sayHello(name: String!): String!
  }
`;

const resolvers = {
  Query: {
    test: () => "Test from backend",
  },
  Mutation: {
    sayHello: (_parent: unknown, args: { name: string }) => {
      return `Hello ${args.name}`;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
