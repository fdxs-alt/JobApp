import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { MyContext } from '../types-graphql/MyContext';
import { verify } from 'jsonwebtoken';
export const AuthMiddleware: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new AuthenticationError('User unauthorized');
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.secret);
    context.payload = payload as any;
  } catch (error) {
    throw new AuthenticationError('User unauthorized');
  }
  return next();
};
