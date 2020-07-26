import { Resolver, Query, UseMiddleware, Ctx } from 'type-graphql';
import { AuthMiddleware } from '../utils/AuthMiddleware';
import { UserResponse } from '../types-graphql/UserResponse';
import { User } from '../entity/User';
import { MyContext } from '../types-graphql/MyContext';
import { AuthenticationError } from 'apollo-server-express';
@Resolver()
export class UserResolver {
  @UseMiddleware(AuthMiddleware)
  @Query(() => UserResponse)
  async getUser(@Ctx() ctx: MyContext): Promise<UserResponse> {
    if (!ctx.req.session!.userId) new AuthenticationError('User unauthorized');

    const user = await User.findOne({ where: { id: ctx.req.session!.userId } });
    return { user };
  }
}
