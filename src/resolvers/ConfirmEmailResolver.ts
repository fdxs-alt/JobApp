import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ConfirmEmailPostfix } from '../constants/NodeMailerConstants';
@Resolver()
export class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirm(
    @Arg('token') token: String,
    @Ctx() { redis },
  ): Promise<boolean> {
    const userId = await redis.get(token + ConfirmEmailPostfix);
    if (!userId) return false;

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token + ConfirmEmailPostfix);

    return true;
  }
}
