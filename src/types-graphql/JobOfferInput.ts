import { Field, InputType } from 'type-graphql';
import { ArrayNotEmpty, IsNotEmpty, IsBoolean } from 'class-validator';
@InputType()
export class JobOfferInput {
  @Field()
  title: string;

  @Field()
  localisation: string;

  @Field(() => [String])
  mandatory: string[];

  @Field(() => [String])
  extraSkills: string[];

  @Field(() => [String])
  tasks: string[];

  @Field(() => [String])
  benefitsInWork: string[];

  @Field()
  minSalary: number;

  @Field()
  maxSalary: number;

  @Field()
  onlineRecrutation: boolean;

  @Field()
  main: string;

  @Field()
  description: string;
}
