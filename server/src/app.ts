import { UserResolver } from './resolvers/UserResolver';
import { ResetPasswordResolver } from './resolvers/ResetPasswordResolver';
import { CompanyResolver } from './resolvers/CompanyResolver';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './utils/createTokens';
import { sendRefreshCookie } from './utils/sendRefreshCookie';
import cors from 'cors';
import { join } from 'path';
import dotenv from 'dotenv';
import { AuthResolver } from './resolvers/AuthResolver';
import { ConfirmEmailResolver } from './resolvers/ConfirmEmailResolver';
import { CvResolver } from './resolvers/CvResolver';
import { ForgetPasswordResolver } from './resolvers/ForgetPasswordResolver';
import { ImageResolver } from './resolvers/ImageResolver';
import { JobOfferResolver } from './resolvers/JobOfferResolver';
import { LogoResolver } from './resolvers/LogoResolver';
import { LogoutResolver } from './resolvers/LogoutResolver';
import { OpinionResolver } from './resolvers/OpinionResolver';
dotenv.config();
const main = async () => {
  const app = express();

  await createConnection();
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.baseurl,
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
      resolvers: [
        AuthResolver,
        CompanyResolver,
        ConfirmEmailResolver,
        CvResolver,
        ForgetPasswordResolver,
        ImageResolver,
        JobOfferResolver,
        LogoResolver,
        LogoutResolver,
        OpinionResolver,
        ResetPasswordResolver,
        UserResolver,
      ],
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

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
};

main();
