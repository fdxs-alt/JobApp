import {
  Resolver,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  Query,
} from 'type-graphql';
import { JobOffer } from '../entity/JobOffer';
import { JobOfferInput } from '../types-graphql/JobOfferInput';
import { MyContext } from '../types-graphql/MyContext';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { Company } from '../entity/CompanyDetails';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';

@Resolver()
export class JobOfferResolver {
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => JobOffer)
  async createNewJobOffer(
    @Arg('input')
    {
      benefitsInWork,
      extraSkills,
      mandatory,
      maxSalary,
      minSalary,
      onlineRecrutation,
      tasks,
      title,
    }: JobOfferInput,
    @Ctx() ctx: MyContext,
  ): Promise<JobOffer> {
    if (!ctx.req.session!.userId)
      throw new AuthenticationError('User unauthorized');

    const alreadyHasCreatedCompany = await Company.findOne({
      employer: ctx.req.session!.userId,
    });

    if (!alreadyHasCreatedCompany)
      throw new ApolloError('You need to create your company first');

    const newJobOffer = JobOffer.create({
      benefitsInWork,
      extraSkills,
      mandatory,
      maxSalary,
      minSalary,
      onlineRecrutation,
      tasks,
      title,
      company: alreadyHasCreatedCompany,
    });
    await newJobOffer.save();
    return newJobOffer;
  }
  @Query(() => [JobOffer])
  async allJobOffers(): Promise<JobOffer[]> {
    const jobOffers = await JobOffer.find({});

    return jobOffers;
  }
}
