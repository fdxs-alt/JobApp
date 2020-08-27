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
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { Cv } from '../entity/Cv';
import { MyContext } from '../types-graphql/MyContext';
import { User } from '../entity/User';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';
import { Company } from '../entity/CompanyDetails';
import { CvResponse } from '../types-graphql/CvResponse';

@Resolver()
export class CvResolver {
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => Boolean)
  async addCv(
    @Arg('file', () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg('id', () => Number) id: number,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    if (
      mimetype !== 'application/pdf' &&
      mimetype !== 'application/vnd.ms-excel'
    )
      return false;
    const time = Date.now();
    const destination = path.join(__dirname + `../../../cv/${time + filename}`);
    const p = new Promise<boolean>((res, rej) => {
      createReadStream().pipe(
        createWriteStream(destination)
          .on('finish', async () => {
            try {
              const user = await User.findOne({
                id: ctx.payload.userId as any,
              });

              if (!user) {
                unlinkSync(destination);
                return res(false);
              }

              const jobOffer = await JobOffer.findOne({ id });

              if (!jobOffer) {
                unlinkSync(destination);
                return res(false);
              }

              const cv = await Cv.findOne({
                where: { joboffer: jobOffer, user },
              });

              if (cv) {
                unlinkSync(destination);
                return res(false);
              }

              const newCV = Cv.create({
                name: time + filename,
                type: mimetype,
                data: ('\\x' +
                  readFileSync(destination, { encoding: 'hex' })) as any,
                joboffer: jobOffer,
                user,
              });

              await newCV.save();

              return res(true);
            } catch (error) {
              console.log(error);
              return res(false);
            }
          })
          .on('error', () => {
            rej(false);
          }),
      );
    });
    const result = await Promise.resolve(p);
    return result;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Query(() => [CvResponse])
  async getAllCvs(@Ctx() ctx: MyContext): Promise<CvResponse[]> {
    try {
      const company = await Company.findOne({
        employer: ctx.payload.userId as any,
      });

      const joboffers = await JobOffer.find({ where: { company: company.id } });

      const c = await Promise.all(
        joboffers.map(async (joboffer) => {
          const cvs = await Cv.find({ where: { joboffer } });

          return { cvs, joboffer };
        }),
      );

      return c;
    } catch (error) {
      console.log(error);
      throw new Error('An error occured');
    }
  }
}
