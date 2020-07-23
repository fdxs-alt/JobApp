import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/AuthResolver';
import { redis } from './redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
})();
