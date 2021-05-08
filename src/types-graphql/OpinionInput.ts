import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class OpinionInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  id: number;
}
