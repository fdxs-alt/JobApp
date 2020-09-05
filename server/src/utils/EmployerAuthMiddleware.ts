import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { MyContext } from '../types-graphql/MyContext';
import { User } from '../entity/User';
import { verify } from 'jsonwebtoken';

export const EmployerAuthMiddleware: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new AuthenticationError('User unauthorized');
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.secret);

    const user = await User.findOne({ id: (payload as any).userId });
    if (!user.hasCompany) throw new AuthenticationError('User unauthorized');
    context.payload = payload as any;
  } catch (error) {
    throw new AuthenticationError('User unauthorized');
  }
  return next();
};
