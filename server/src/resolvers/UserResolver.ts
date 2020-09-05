import { compare, hash } from 'bcryptjs';
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
import { ChangePasswordInput } from '../utils/ChangePasswordInput';

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
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async changePassword(
    @Arg('data', () => ChangePasswordInput)
    { prevPassword, password, confirmPassword }: ChangePasswordInput,
    @Ctx() { payload }: MyContext,
  ): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { id: payload.userId } });
      if (password !== confirmPassword)
        throw new Error('Passwords must be identical');
      const isProperPassword = await compare(prevPassword, user.password);
      if (!isProperPassword) throw new Error('User unauthorized');
      user.password = await hash(password, 10);
      await user.save();
      return true;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() { payload }: MyContext): Promise<Boolean> {
    try {
      const user = await User.findOne({ where: { id: payload.userId } });

      await user.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
}
