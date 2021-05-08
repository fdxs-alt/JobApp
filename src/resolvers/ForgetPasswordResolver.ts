import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ChangePasswordPostfix } from '../constants/Contants';
import { sendEmail } from '../utils/sendEmail';
import { MyContext } from '../types-graphql/MyContext';
import { resetPasswordSubject } from '../constants/Contants';
import { sign } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async resetEmail(
    @Arg('email') email: string,
    @Ctx() { url }: MyContext,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApolloError("Can't indetify user");

    const token = sign(
      user.id + ' ' + ChangePasswordPostfix,
      process.env.secret,
    );
    try {
      await sendEmail(
        url + `/user/changePassword/${token}`,
        email,
        resetPasswordSubject,
      );
    } catch (error) {
      throw new ApolloError('An error occured');
    }

    return true;
  }
}
