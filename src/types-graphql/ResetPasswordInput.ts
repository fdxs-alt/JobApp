import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field()
  token: string;
}
