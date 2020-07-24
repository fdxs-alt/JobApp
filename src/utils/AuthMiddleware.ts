import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { MyContext } from '../types-graphql/MyContext';

export const AuthMiddleware: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  if (!context.req.session!.userId) {
    throw new AuthenticationError('Not authenticated');
  }
  return next();
};
