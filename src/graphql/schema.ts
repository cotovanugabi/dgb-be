import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type Season {
    id: ID!
    name: String!
  }

  input CreateSeasonInput {
    id: String
    name: String!
  }

  type Query {
    seasons: [Season]
  }

  type Mutation {
    createSeason(input: CreateSeasonInput): Season
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
