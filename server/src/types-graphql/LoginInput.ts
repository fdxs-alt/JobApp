import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { isUserWithEmail } from '../utils/AuthValidation';
@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: "Email field can't be empty" })
  @isUserWithEmail({ message: 'Email or password is wrong' })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Password field can't be empty" })
  password: string;
}
