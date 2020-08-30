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
import { Images } from '../entity/Images';
import { Logo } from '../entity/Logo';
import { SpecificOfferResponse } from '../types-graphql/SpecificOfferResponse';
import { getConnection, Like } from 'typeorm';
import { capitalize } from 'lodash';
import { findJobOfferInput } from '../types-graphql/findJobOffersInput';

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
      localisation,
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
      localisation: capitalize(localisation),
      description: capitalize(description),
      main: capitalize(main),
      title: capitalize(title),
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

  @Query(() => SpecificOfferResponse)
  async getSpecificInfo(@Arg('id') id: number): Promise<SpecificOfferResponse> {
    try {
      const offer = await getConnection()
        .getRepository(JobOffer)
        .createQueryBuilder('joboffer')
        .leftJoinAndSelect('joboffer.company', 'company')
        .where('joboffer.id = :id', { id })
        .getOne();

      const logo = await Logo.findOne({ where: { company: offer.company.id } });
      const images = await Images.find({ where: { joboffer: offer.id } });

      return { offer, images, logo };
    } catch (error) {
      throw new Error('An error occured');
    }
  }
  @Query(() => [JobOffer])
  async getRandomJobOffers(): Promise<JobOffer[]> {
    try {
      const randomJobOffers = await getConnection()
        .getRepository(JobOffer)
        .createQueryBuilder('joboffer')
        .leftJoinAndSelect('joboffer.company', 'company')
        .orderBy('RANDOM()')
        .limit(5)
        .getMany();

      return randomJobOffers;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
  @Query(() => [JobOffer])
  async searchJobOffers(@Arg('input') input: string): Promise<JobOffer[]> {
    try {
      const joboffers = await getConnection()
        .getRepository(JobOffer)
        .find({
          where: [
            { title: Like('%' + capitalize(input) + '%') },
            { title: Like('%' + input + '%') },
            { main: input },
            { main: capitalize(input) },
            { description: Like('%' + input + '%') },
            { description: Like('%' + capitalize(input) + '%') },
            { localisation: Like('%' + input + '%') },
            { localisation: Like('%' + capitalize(input) + '%') },
          ],
          join: {
            alias: 'j',
            leftJoinAndSelect: {
              company: 'j.company',
            },
          },
        });

      return joboffers;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
  @Query(() => [JobOffer])
  async findJobOffers(
    @Arg('input')
    input: findJobOfferInput,
  ): Promise<JobOffer[]> {
    const { localisation, main, minSalary, title } = input;

    const Query = await getConnection()
      .getRepository(JobOffer)
      .createQueryBuilder('q');

    if (localisation) {
      Query.andWhere('q.localisation ilike :localisation', {
        localisation: `%${localisation}%`,
      });
      Query.andWhere('q.localisation ilike :localisation', {
        localisation: `%${capitalize(localisation)}%`,
      });
    }

    if (main) {
      Query.andWhere('q.main ilike :main', { main: `%${main}%` });
      Query.andWhere('q.main ilike :main', { main: `%${capitalize(main)}%` });
    }

    if (title) {
      Query.andWhere('q.title ilike :title', { title: `%${title}%` });
      Query.andWhere('q.title ilike :title', {
        title: `%${capitalize(title)}%`,
      });
    }

    if (minSalary) Query.andWhere('q.minSalary < :minSalary', { minSalary });

    return Query.getMany();
  }
}
