import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserResponse } from '../types-graphql/UserResponse';
import { LoginInput } from '../types-graphql/LoginInput';
import { RegisterInput } from '../types-graphql/RegisterInput';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import { MyContext } from '../types-graphql/MyContext';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: RegisterInput,
  ): Promise<UserResponse> {
    const bcryptedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      email,
      password: bcryptedPassword,
    });
    await user.save();

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AuthenticationError('Email or password is wrong');

    ctx.req.session!.userId = user.id;
    return { user };
  }
}
