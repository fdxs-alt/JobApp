import { ObjectType, Field } from 'type-graphql';
import { JobOffer } from '../entity/JobOffer';
import { Logo } from '../entity/Logo';

import { Images } from '../entity/Images';

@ObjectType()
export class SpecificOfferResponse {
  @Field(() => JobOffer)
  offer: JobOffer;

  @Field(() => Logo, { nullable: true })
  logo: Logo;

  @Field(() => [Images], { nullable: true })
  images: Images[];
}
