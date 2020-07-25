import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ResetPasswordInput } from '../types-graphql/ResetPasswordInput';
import { ChangePasswordPrefix } from '../constants/NodeMailerConstants';
import bcrypt from 'bcryptjs';
import { MyContext } from '../types-graphql/MyContext';
import { ApolloError } from 'apollo-server-express';
@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async reset(
    @Arg('data') { password, confirmPassword, token }: ResetPasswordInput,
    @Ctx() { redis, req }: MyContext,
  ): Promise<User | ApolloError> {
    const userId = await redis.get(token + ChangePasswordPrefix);
    if (!userId) new ApolloError("Can't change password, try once again");

    const user = await User.findOne({ id: userId });

    if (!user) return new ApolloError("Can't change password, try once again");

    user.password = await bcrypt.hash(password, 10);

    await user.save();
    await redis.del(token + ChangePasswordPrefix);

    req.session!.userId = user.id;

    return user;
  }
}
