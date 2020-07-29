import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ChangePasswordPostfix } from '../constants/NodeMailerConstants';
import { sendEmail } from '../utils/sendEmail';
import { MyContext } from '../types-graphql/MyContext';
import { resetPasswordSubject } from '../constants/NodeMailerConstants';
import { sign } from 'jsonwebtoken';
@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async resetEmail(
    @Arg('email') email: string,
    @Ctx() { url }: MyContext,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;

    const token = sign(
      user.id + ' ' + ChangePasswordPostfix,
      process.env.secret,
    );
    try {
      await sendEmail(
        url + `/user/changePassword/?token=${token}`,
        email,
        resetPasswordSubject,
      );
    } catch (error) {
      return false;
    }

    return true;
  }
}
