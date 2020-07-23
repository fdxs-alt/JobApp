import 'reflect-metadata';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { UserResponse } from '../types-graphql/UserResponse';
import { AuthInput } from '../types-graphql/AuthInput';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userExists, userNotFound, wrongPassword } from '../utils/Errors';
@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) return userExists;

    const bcryptedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      email,
      password: bcryptedPassword,
    });

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) return userNotFound;

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) return wrongPassword;

    const token = jwt.sign({ sub: user.id }, '1234556789', {
      expiresIn: '12h',
    });

    return { user, token };
  }
}
