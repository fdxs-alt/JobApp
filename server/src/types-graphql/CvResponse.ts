import { ObjectType, Field } from 'type-graphql';
import { Cv } from '../entity/Cv';
import { JobOffer } from '../entity/JobOffer';

@ObjectType()
export class CvResponse {
  @Field(() => JobOffer)
  joboffer: JobOffer;
  @Field(() => [Cv])
  cvs: Cv[];
}
