import 'reflect-metadata';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { createConnection } from 'typeorm';
import { buildSchema, ArgumentValidationError } from 'type-graphql';
import { redis } from './redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import 'dotenv/config';

const main = async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      url: process.env.baseurl,
    }),
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
    uploads: false,
  });

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: process.env.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    }),
  );
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
};

main();
