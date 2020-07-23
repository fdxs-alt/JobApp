import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class FieldError {
  @Field()
  input: string;

  @Field()
  message: string;
}
