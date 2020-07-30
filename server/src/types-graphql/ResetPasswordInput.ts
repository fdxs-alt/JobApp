import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty({ message: "Password field can't be empty" })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  password: string;

  @Field()
  @IsNotEmpty({ message: "Confirm Password field can't be empty" })
  @Length(8, 32, {
    message: 'Confirm Password must be between 8 and 32 characters',
  })
  confirmPassword: string;

  @Field()
  @IsNotEmpty({ message: "Token field can't be empty" })
  token: string;
}
