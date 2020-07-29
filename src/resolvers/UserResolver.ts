import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  Mutation,
  Arg,
} from 'type-graphql';
import { AuthMiddleware } from '../utils/AuthMiddleware';
import { User } from '../entity/User';
import { MyContext } from '../types-graphql/MyContext';

@Resolver()
export class UserResolver {
  @UseMiddleware(AuthMiddleware)
  @Query(() => User)
  async getUser(@Ctx() ctx: MyContext): Promise<User> {
    const user = await User.findOne({ where: { id: ctx.payload.userId } });
    return user;
  }

  @Mutation(() => Boolean)
  async updateRefreshTokenVersion(
    @Arg('userId', () => String) userId: string,
  ): Promise<boolean> {
    try {
      const user = await User.findOne({ id: userId });
      user.tokenVersion += 1;
      await user.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}
