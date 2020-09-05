import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { verify } from 'jsonwebtoken';

@Resolver()
export class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirm(@Arg('token') token: string): Promise<boolean | Error> {
    try {
      const decoded = verify(token, process.env.secret);

      const id = (decoded as any).userId.split(' ')[0];

      const user = await User.findOne({ id });

      if (user.confirmed) return new Error('User has already been confirmed');

      user.confirmed = true;
      await user.save();

      return true;
    } catch (error) {
      throw new Error('An error occured while trying to confirm email');
    }
  }
}
