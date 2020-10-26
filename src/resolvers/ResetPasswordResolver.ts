import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { ResetPasswordInput } from '../types-graphql/ResetPasswordInput';
import bcrypt from 'bcryptjs';
import { MyContext } from '../types-graphql/MyContext';
import { verify } from 'jsonwebtoken';
import { UserResponse } from '../types-graphql/UserResponse';
import { createAccessToken, createRefreshToken } from '../utils/createTokens';
import { sendRefreshCookie } from '../utils/sendRefreshCookie';

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => UserResponse, { nullable: true })
  async resetPassword(
    @Arg('data') { password, confirmPassword, token }: ResetPasswordInput,
    @Ctx() { res }: MyContext,
  ): Promise<UserResponse> {
    if (confirmPassword !== password) new Error('Passwords are not identical');
    try {
      const decoded = verify(token, process.env.secret);
      const id = (decoded as string).split(' ')[0];

      const user = await User.findOne({ id });

      if (!user) throw new Error("Can't change password, try once again");

      user.password = await bcrypt.hash(password, 10);
      await user.save();

      sendRefreshCookie(res, createRefreshToken(user));
      return { user, accessToken: createAccessToken(user) };
    } catch (error) {
      throw new Error('Error occured during changing password');
    }
  }
}
