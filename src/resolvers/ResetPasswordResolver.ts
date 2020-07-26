import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ResetPasswordInput } from '../types-graphql/ResetPasswordInput';
import { ChangePasswordPostfix } from '../constants/NodeMailerConstants';
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
    if (confirmPassword !== password)
      new ApolloError('Passwords are not identical');

    const userId = await redis.get(token + ChangePasswordPostfix);
    if (!userId) new ApolloError("Can't change password, try once again");

    const user = await User.findOne({ id: userId });

    if (!user) return new ApolloError("Can't change password, try once again");

    user.password = await bcrypt.hash(password, 10);

    await user.save();
    await redis.del(token + ChangePasswordPostfix);

    req.session!.userId = user.id;

    return user;
  }
}
