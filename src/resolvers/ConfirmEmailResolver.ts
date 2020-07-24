import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { UserResponse } from '../types-graphql/UserResponse';
import { ApolloError } from 'apollo-server-express';
import { User } from '../entity/User';

@Resolver()
export class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirm(
    @Arg('token') token: String,
    @Ctx() { redis },
  ): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) return false;

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
