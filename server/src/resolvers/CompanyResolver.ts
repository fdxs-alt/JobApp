import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Query,
} from 'type-graphql';
import { Company } from '../entity/CompanyDetails';
import { CompanyInput } from '../types-graphql/CompanyInput';
import { MyContext } from '../types-graphql/MyContext';
import { User } from '../entity/User';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';
import { ResponseTable, InfoTable } from '../types-graphql/AllInfoResonse';
import { Logo } from '../entity/Logo';
import { getConnection } from 'typeorm';
import { JobOffer } from '../entity/JobOffer';

@Resolver()
export class CompanyResolver {
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Company)
  async createCompany(
    @Arg('input')
    {
      benefits,
      companyName,
      description,
      yearOfSetUp,
      sizeOfCompany,
      localisation,
      technologies,
    }: CompanyInput,
    @Ctx() ctx: MyContext,
  ): Promise<Company> {
    const user = await User.findOne({ where: { id: ctx.payload.userId } });

    const alreadyHasCreatedCompany = await Company.findOne({
      employer: ctx.payload.userId as any,
    });

    if (alreadyHasCreatedCompany)
      throw new Error('You have already created your company');

    if (user.companyName !== companyName)
      throw new Error(
        'Company name must be the same as you passed during registration',
      );
    const newCompany = Company.create({
      benefits,
      companyName,
      description,
      yearOfSetUp,
      sizeOfCompany,
      localisation,
      technologies,
      employer: user,
    });

    await newCompany.save();

    return newCompany;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Boolean)
  async deleteComapny(
    @Arg('id') id: number,
    @Ctx() ctx: MyContext,
  ): Promise<Boolean | [Boolean, Error]> {
    try {
      const comapnyExists = await Company.findOne({
        id,
        employer: ctx.payload.userId as any,
      });

      if (!comapnyExists) return false;

      await Company.delete({
        id,
        employer: ctx.payload.userId as any,
      });
      return true;
    } catch (error) {
      return [false, error];
    }
  }
  @Query(() => [Company])
  async getAllComapanies(): Promise<Company[]> {
    const allCorporations = await Company.find();

    return allCorporations;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Query(() => Company, { nullable: true })
  async getUserCompany(@Ctx() ctx: MyContext): Promise<Company> {
    const userCorportion = await Company.findOne({
      employer: ctx.payload.userId as any,
    });
    return userCorportion;
  }
  @Query(() => ResponseTable)
  async getAllInfo(@Arg('cursor') cursor: number): Promise<ResponseTable> {
    try {
      const joboffers = await getConnection()
        .getRepository(JobOffer)
        .createQueryBuilder('joboffer')
        .leftJoinAndSelect('joboffer.company', 'company')
        .skip(cursor)
        .take(9)
        .getMany();

      const result: InfoTable[] = [];

      await Promise.all(
        joboffers.map(async (element) => {
          const logo = await Logo.findOne({
            where: { company: element.company.id },
          });
          result.push({ jobOffer: element, logo });
        }),
      );

      return { info: result, hasMore: result.length === 9 };
    } catch (error) {
      throw new Error('An error occured');
    }
  }
}
