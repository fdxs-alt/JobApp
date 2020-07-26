import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { MyContext } from '../types-graphql/MyContext';
import { User } from '../entity/User';

export const EmployerAuthMiddleware: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  if (!context.req.session!.userId) {
    throw new AuthenticationError('Not authenticated');
  }
  const isEmployer = await (
    await User.findOne({ id: context.req.session!.userId })
  ).hasCompany;

  if (!isEmployer)
    throw new AuthenticationError('You are not allowed to create this section');

  return next();
};
