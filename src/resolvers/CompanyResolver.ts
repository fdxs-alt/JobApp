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
import { ApolloError } from 'apollo-server-express';
import { User } from '../entity/User';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';

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
    const user = await User.findOne({ where: { id: ctx.req.session!.userId } });

    const alreadyHasCreatedCompany = await Company.findOne({
      employer: ctx.req.session!.userId,
    });

    if (alreadyHasCreatedCompany)
      throw new ApolloError('You have already created your company');

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
  @Mutation(() => Boolean)
  async deleteComapny(
    @Arg('id') id: number,
    @Ctx() ctx: MyContext,
  ): Promise<Boolean | [Boolean, Error]> {
    try {
      const comapnyExists = await Company.findOne({
        id,
        employer: ctx.req.session!.userId,
      });

      if (!comapnyExists) return false;

      await Company.delete({
        id,
        employer: ctx.req.session!.userId,
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
}
