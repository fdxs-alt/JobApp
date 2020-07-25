import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../types-graphql/MyContext';
@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve, rej) => {
      req.session!.destroy((err) => {
        if (err) return rej(false);

        res.clearCookie('qid');

        resolve(true);
      });
    });
  }
}
