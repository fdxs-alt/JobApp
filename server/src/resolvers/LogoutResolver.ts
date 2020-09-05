import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../types-graphql/MyContext';
@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { res }: MyContext): boolean {
    res.clearCookie('jrc');
    return true;
  }
}
