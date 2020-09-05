import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserResponse } from '../types-graphql/UserResponse';
import { LoginInput } from '../types-graphql/LoginInput';
import { RegisterInput } from '../types-graphql/RegisterInput';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import { MyContext } from '../types-graphql/MyContext';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { createConfirmationLink } from '../utils/createConfirmationLink';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailSubject } from '../constants/Contants';
import { createAccessToken, createRefreshToken } from '../utils/createTokens';
import { sendRefreshCookie } from '../utils/sendRefreshCookie';
import { capitalize } from 'lodash';
@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async register(
    @Ctx() { url }: MyContext,
    @Arg('input')
    { email, password, companyName, hasCompany, name, surname }: RegisterInput,
  ): Promise<boolean> {
    const bcryptedPassword = await bcrypt.hash(password, 10);

    if (hasCompany && !companyName)
      throw new ApolloError(
        'If you are working for company, you need to provide company name',
      );
    const user = User.create({
      email,
      password: bcryptedPassword,
      companyName: capitalize(companyName),
      hasCompany,
      name: capitalize(name),
      surname: capitalize(surname),
    });
    await user.save();
    const confirmEmailLink = await createConfirmationLink(url, user.id);

    if (!confirmEmailLink)
      throw new Error('An error occured during sending confirmation email');

    await sendEmail(confirmEmailLink, email, confirmEmailSubject);

    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AuthenticationError('Email or password is wrong');

    if (!user.confirmed)
      throw new AuthenticationError('You need to confirm your account first');

    sendRefreshCookie(ctx.res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
