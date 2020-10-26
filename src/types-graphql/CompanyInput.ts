import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Min, ArrayNotEmpty } from 'class-validator';

@InputType()
export class CompanyInput {
  @Field()
  @IsNotEmpty({ message: "Company name field can't be empty" })
  companyName: string;

  @Field()
  @IsNotEmpty({ message: "Setup Field field can't be empty" })
  yearOfSetUp: number;

  @Field()
  @Min(1, { message: "Size of company can't be below 1" })
  @IsNotEmpty({ message: "Size of company field can't be empty" })
  sizeOfCompany: number;

  @Field()
  @IsNotEmpty({ message: "Localisation field can't be empty" })
  localisation: string;

  @Field()
  @IsNotEmpty({ message: "Description field can't be empty" })
  description: string;

  @Field(() => [String])
  @ArrayNotEmpty({ message: "Technologies field can't be empty" })
  technologies: string[];

  @Field(() => [String])
  @ArrayNotEmpty({ message: "Benefits field can't be empty" })
  benefits: string[];
}
