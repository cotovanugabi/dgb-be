import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import { initMiddleware } from "../../lib/middleware";
import { schema } from "../../graphql/schema";
import { graphqlEndpoint } from "../../config";

const initCors = initMiddleware(
  cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    {
      // Fires whenever a GraphQL request is received from a client.
      async requestDidStart(requestContext) {
        console.log("Request started! Query:\n" + requestContext.request.query);

        return {
          // Fires whenever Apollo Server will parse a GraphQL
          // request to create its associated document AST.
          async parsingDidStart(requestContext) {
            console.log("Parsing started!");
          },

          // Fires whenever Apollo Server will validate a
          // request's document AST against your GraphQL schema.
          async validationDidStart(requestContext) {
            console.log("Validation started!");
          },
        };
      },
    },
  ],
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initCors(req, res);
  await startServer;
  await apolloServer.createHandler({
    path: graphqlEndpoint,
  })(req, res);
}
