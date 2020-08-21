import { Field, ObjectType } from 'type-graphql';
import { Company } from '../entity/CompanyDetails';
import { Logo } from '../entity/Logo';

export type AllInfo = {
  company: Company;
  logo: Logo;
};

@ObjectType()
export class AllInfoResponse {
  @Field(() => Company)
  company: Company;
  @Field(() => Logo, { nullable: true })
  logo: Logo;
}
