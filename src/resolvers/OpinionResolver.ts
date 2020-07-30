import {
  UseMiddleware,
  Arg,
  Ctx,
  Resolver,
  Mutation,
  Query,
} from 'type-graphql';
import { MyContext } from '../types-graphql/MyContext';
import { AuthMiddleware } from '../utils/AuthMiddleware';
import { Opinion } from '../entity/Opinions';
import { OpinionInput } from '../types-graphql/OpinionInput';
import { User } from '../entity/User';
import { Company } from '../entity/CompanyDetails';

@Resolver()
export class OpinionResolver {
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Opinion)
  async addOpinion(
    @Arg('input') { description, title, id }: OpinionInput,
    @Ctx() { payload }: MyContext,
  ): Promise<Opinion> {
    try {
      const user = await User.findOne({ id: payload.userId });

      if (!user) throw new Error("Can't identify user");

      const company = await Company.findOne({ id });

      if (!company) throw new Error("Can't identify company");

      const newOpinion = Opinion.create({ description, title, user });

      await newOpinion.save();

      return newOpinion;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  @Query(() => [Opinion])
  async getAllOpinions(@Arg('id') id: number): Promise<Opinion[]> {
    try {
      const company = await Company.findOne({ id });
      if (!company) throw new Error("Can't identify comapny");
      const opinions = await Opinion.find({ company });
      if (opinions.length === 0) throw new Error('There are no opinions yet');
      return opinions;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async deleteOpinion(@Arg('id') id: number): Promise<boolean> {
    try {
      const opinionToDelete = await Opinion.findOne({ id });
      await opinionToDelete.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
}
