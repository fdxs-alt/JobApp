import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { isUserWithEmail } from '../utils/AuthValidation';
@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
