import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import { isEmailInUse } from '../utils/AuthValidation';
@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty({ message: "Email field can't be empty" })
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  @IsEmail()
  @isEmailInUse({ message: 'Email is already in use' })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Password field can't be empty" })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  password: string;
}
