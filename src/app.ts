import 'reflect-metadata';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema, ArgumentValidationError } from 'type-graphql';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/UserResolver';
import { redis } from './redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const main = async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver],
    }),
    context: ({ req }) => ({ req }),
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      if (error.originalError instanceof ArgumentValidationError) {
        const { extensions, locations, message, path } = error;

        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';

        return {
          extensions,
          locations,
          message,
          path,
        };
      }

      error.message = 'Internal Server Error';

      return error;
    },
  });

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
};

main();
