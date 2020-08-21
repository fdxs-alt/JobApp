import { Field, ObjectType } from 'type-graphql';
import { Company } from '../entity/CompanyDetails';
import { Logo } from '../entity/Logo';
import { JobOffer } from '../entity/JobOffer';

export type AllInfo = {
  company: Company;
  offers: JobOffer[];
  logo: Logo;
};

@ObjectType()
export class AllInfoResponse {
  @Field(() => Company)
  company: Company;
  @Field(() => [JobOffer], { nullable: true })
  offers: JobOffer[];
  @Field(() => Logo, { nullable: true })
  logo: Logo;
}
