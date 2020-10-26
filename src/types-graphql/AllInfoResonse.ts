import { Field, ObjectType } from 'type-graphql';
import { Logo } from '../entity/Logo';
import { JobOffer } from '../entity/JobOffer';

@ObjectType()
export class ResponseTable {
  @Field(() => [JobOffer])
  info: JobOffer[];
  @Field()
  hasMore: boolean;
}
