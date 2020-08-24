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
import moment from 'moment';

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
      description,
      main,
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
      description,
      main,
      title,
      date: moment().format('DD-MM-YYYY'),
      company: alreadyHasCreatedCompany,
    });

    await newJobOffer.save();
    return newJobOffer;
  }
  @UseMiddleware(EmployerAuthMiddleware)
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

    const jobOffers = await JobOffer.find({
      company: alreadyHasCreatedCompany,
    });

    return jobOffers;
  }

  @Query(() => JobOffer)
  async specificJobOffer(@Arg('id') id: number): Promise<JobOffer> {
    const offer = await JobOffer.findOne({ id });
    if (!offer) throw new Error("Offer with given id doesn't exist");

    return offer;
  }
}
