import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  hasCompany: boolean;

  @Field({ nullable: true })
  companyName?: string;

  @Field()
  name: string;

  @Field()
  surname: string;
}
