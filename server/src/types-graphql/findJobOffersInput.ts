import { Field, InputType } from 'type-graphql';
@InputType()
export class findJobOfferInput {
  @Field({ nullable: true })
  main?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  localisation?: string;

  @Field({ nullable: true })
  minSalary?: number;
}
