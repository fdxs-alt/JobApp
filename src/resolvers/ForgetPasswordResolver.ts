import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ChangePasswordPostfix } from '../constants/NodeMailerConstants';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail';
import { MyContext } from '../types-graphql/MyContext';
import { resetPasswordSubject } from '../constants/NodeMailerConstants';
@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async resetEmail(
    @Arg('email') email: string,
    @Ctx() { redis, url }: MyContext,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;

    const token = uuidv4();

    await redis.set(token + ChangePasswordPostfix, user.id, 'ex', 60 * 60 * 24);

    await sendEmail(
      url + `/user/changePassword/?token=${token}`,
      email,
      resetPasswordSubject,
    );

    return true;
  }
}
