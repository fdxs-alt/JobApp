import { Field, InputType } from 'type-graphql';
import { ArrayNotEmpty, IsNotEmpty, IsBoolean } from 'class-validator';
@InputType()
export class JobOfferInput {
  @Field()
  @IsNotEmpty({ message: "Title field can't be empty" })
  title: string;

  @Field(() => [String])
  @IsNotEmpty({ message: "Mandatory field can't be empty" })
  mandatory: string[];

  @Field(() => [String])
  @ArrayNotEmpty({ message: "Extra skills field can't be empty" })
  extraSkills: string[];

  @Field(() => [String])
  @ArrayNotEmpty({ message: "Tasks field can't be empty" })
  tasks: string[];

  @Field(() => [String])
  @ArrayNotEmpty({ message: "Benefits field can't be empty" })
  benefitsInWork: string[];

  @Field()
  @IsNotEmpty({ message: "Minimum salary field can't be empty" })
  minSalary: number;

  @Field()
  @IsNotEmpty({ message: "Maximum salary field can't be empty" })
  maxSalary: number;

  @Field()
  @IsBoolean({ message: 'Value of fild must be true or false' })
  onlineRecrutation: boolean;

  @Field()
  @IsNotEmpty({ message: "Maximum salary field can't be empty" })
  main: string;

  @Field()
  @IsNotEmpty({ message: "Maximum salary field can't be empty" })
  description: string;
}
