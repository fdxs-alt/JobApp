import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './utils/createTokens';
import { sendRefreshCookie } from './utils/sendRefreshCookie';
import cors from 'cors';
import { join } from 'path';
import helmet from 'helmet';
const main = async () => {
  const app = express();

  await createConnection();
  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.post('/refresh', async (req: Request, res: Response) => {
    const refreshToken = req.cookies.jrc;

    if (!refreshToken) return res.send({ ok: false, accessToken: '' });

    let decoded = null;

    try {
      decoded = verify(refreshToken, process.env.secret_2);
    } catch (error) {
      return res.send({ ok: false, accessToken: '' });
    }
    const user = await User.findOne({ id: decoded.userId });

    if (!user) return res.send({ ok: false, accessToken: '' });

    if (user.tokenVersion !== decoded.tokenVersion)
      return res.send({ ok: false, accessToken: '' });

    sendRefreshCookie(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
      isOwner: user.hasCompany,
    });
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      url: process.env.baseurl,
    }),
    uploads: false,
  });

  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.use('/cv', express.static(join(__dirname, '../cv')));

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
};

main();
