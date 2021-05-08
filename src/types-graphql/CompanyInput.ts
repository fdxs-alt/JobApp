import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Min, ArrayNotEmpty } from 'class-validator';

@InputType()
export class CompanyInput {
  @Field()
  companyName: string;

  @Field()
  yearOfSetUp: number;

  @Field()
  sizeOfCompany: number;

  @Field()
  localisation: string;

  @Field()
  description: string;

  @Field(() => [String])
  technologies: string[];

  @Field(() => [String])
  benefits: string[];
}
