import {
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  Ctx,
  Query,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { AuthMiddleware } from '../utils/AuthMiddleware';
import { createWriteStream } from 'fs';
import { JobOffer } from '../entity/JobOffer';
import fs from 'fs';
import path from 'path';
import { Cv } from '../entity/Cv';
import { MyContext } from '../types-graphql/MyContext';
import { User } from '../entity/User';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';

@Resolver()
export class CvResolver {
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async addCv(
    @Arg('cv', () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg('id', () => Number) id: number,
    @Ctx('ctx') { payload }: MyContext,
  ): Promise<boolean> {
    const p = new Promise<boolean>((res, rej) => {
      createReadStream().pipe(
        createWriteStream(
          path.join(__dirname + `../../../cv/${Date.now() + filename}`),
        )
          .on('finish', async () => {
            try {
              const user = await User.findOne({ id: payload.userId });
              if (!user) return res(false);
              const jobOffer = await JobOffer.findOne({ id });
              if (!jobOffer) return res(false);
              const newCV = Cv.create({
                name: filename,
                type: mimetype,
                data: ('\\x' +
                  fs.readFileSync(
                    __dirname + `../../../images/${Date.now() + filename}`,
                    { encoding: 'hex' },
                  )) as any,
                joboffer: jobOffer,
              });
              await newCV.save();
              res(true);
            } catch (error) {
              return res(false);
            }
          })
          .on('error', () => rej(false)),
      );
    });
    const result = await Promise.resolve(p);
    return result;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Query(() => [Cv])
  async getAllCvs(@Arg('id') id: number): Promise<Cv[]> {
    try {
      const joboffer = await JobOffer.findOne({ id });
      if (!joboffer) throw new Error("Can't identify the offer");
      const cvs = await Cv.find({ joboffer });
      return cvs;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
}
