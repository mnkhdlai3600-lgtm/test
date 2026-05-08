import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `#graphql
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

const apolloHandler = startServerAndCreateNextHandler(server);

export async function GET(request: Request): Promise<Response> {
  return apolloHandler(request) as Promise<Response>;
}

export async function POST(request: Request): Promise<Response> {
  return apolloHandler(request) as Promise<Response>;
}
