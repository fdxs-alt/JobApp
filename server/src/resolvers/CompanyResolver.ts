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
import { ResponseTable } from '../types-graphql/AllInfoResonse';
import { getConnection } from 'typeorm';
import { JobOffer } from '../entity/JobOffer';
import { capitalize } from 'lodash';
import { Logo } from '../entity/Logo';
import { CompanyResponse } from '../types-graphql/CompanyResponse';

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
      companyName: capitalize(companyName),
      description: capitalize(description),
      yearOfSetUp,
      sizeOfCompany,
      localisation: capitalize(localisation),
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
  @Query(() => [Logo])
  async getAllComapanies(@Arg('cursor') cursor: number): Promise<Logo[]> {
    const companies = await getConnection()
      .getRepository(Logo)
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.company', 'company')
      .skip(cursor)
      .take(24)
      .getMany();

    return companies;
  }

  @Query(() => Number)
  async getCompaniesCount(): Promise<number> {
    const quantity = await Company.count();
    return quantity;
  }

  @Query(() => CompanyResponse)
  async getSpecificCompany(@Arg('id') id: number): Promise<CompanyResponse> {
    try {
      const company = await Company.findOne({ where: { id } });

      if (!company) throw new Error("Can't find company with specified id");

      const logo = await Logo.findOne({ where: { company } });

      return { company, logo };
    } catch (error) {
      throw new Error('An error occured');
    }
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

      return { info: joboffers, hasMore: joboffers.length === 9 };
    } catch (error) {
      throw new Error('An error occured');
    }
  }
}
