import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};
async () => {
    const app = express();

    await createConnection();

    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => `Sever running on port ${PORT}`);
};
