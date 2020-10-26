import { ObjectType, Field } from 'type-graphql';
import { Company } from '../entity/CompanyDetails';
import { Logo } from '../entity/Logo';

@ObjectType()
export class CompanyResponse {
  @Field(() => Company)
  company: Company;
  @Field(() => Logo, { nullable: true })
  logo: Logo;
}
