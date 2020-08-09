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
  @Query(() => Company)
  async getUserCompany(@Ctx() ctx: MyContext): Promise<Company> {
    const userCorportion = await Company.findOne({
      employer: ctx.payload.userId as any,
    });
    return userCorportion;
  }
}
