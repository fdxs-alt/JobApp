import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class OpinionInput {
  @Field()
  @IsNotEmpty({ message: "Title field can't be empty" })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Description field can't be empty" })
  description: string;

  @Field()
  @IsNotEmpty({ message: "Description field can't be empty" })
  id: number;
}
