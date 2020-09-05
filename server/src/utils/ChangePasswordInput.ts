import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  prevPassword: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}
