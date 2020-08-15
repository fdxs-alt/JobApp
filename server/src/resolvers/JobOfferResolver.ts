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
    const alreadyHasCreatedCompany = await Company.findOne({
      employer: ctx.payload.userId as any,
    });

    if (!alreadyHasCreatedCompany)
      throw new Error('You need to create your company first');

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
  @Mutation(() => Boolean)
  async deleteJobOffer(
    @Arg('id') id: number,
  ): Promise<Boolean | [Boolean, Error]> {
    try {
      const jobOfferExists = await JobOffer.findOne({ id });
      if (!jobOfferExists) return false;
      await JobOffer.delete({
        id,
      });
      return true;
    } catch (error) {
      return [false, error];
    }
  }
  @Query(() => [JobOffer])
  async allJobOffers(): Promise<JobOffer[]> {
    const jobOffers = await JobOffer.find({});

    return jobOffers;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Query(() => [JobOffer])
  async allUsersOffers(@Ctx() ctx: MyContext): Promise<JobOffer[]> {
    const alreadyHasCreatedCompany = await Company.findOne({
      employer: ctx.payload.userId as any,
    });

    if (!alreadyHasCreatedCompany)
      throw new Error('You need to create your company first');

    const jobOffers = await JobOffer.find({
      company: alreadyHasCreatedCompany,
    });

    return jobOffers;
  }
}
