import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloWorldResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}/graphql`);
    });
})();
