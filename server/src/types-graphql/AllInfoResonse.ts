import { Field, ObjectType } from 'type-graphql';
import { Logo } from '../entity/Logo';
import { JobOffer } from '../entity/JobOffer';

export type AllInfo = {
  jobOffer: JobOffer;
  logo: Logo;
};

@ObjectType()
export class InfoTable {
  @Field(() => JobOffer)
  jobOffer: JobOffer;
  @Field(() => Logo, { nullable: true })
  logo: Logo;
}

@ObjectType()
export class ResponseTable {
  @Field(() => [InfoTable])
  info: InfoTable[];
  @Field()
  hasMore: boolean;
}
