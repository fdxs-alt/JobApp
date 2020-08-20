import { Resolver, Query, UseMiddleware, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import path from 'path';
import { createWriteStream, unlinkSync, readFileSync } from 'fs';
import { Company } from '../entity/CompanyDetails';
import { Logo } from '../entity/Logo';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';

@Resolver()
export class LogoResolver {
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Boolean)
  async addLogo(
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
    @Arg('id', () => Number) id: number,
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file;

    const destination = path.join(
      __dirname + `../../../images/${Date.now() + filename}`,
    );

    const addLogoPromise = new Promise<boolean>((res, rej) => {
      createReadStream().pipe(
        createWriteStream(destination)
          .on('finish', async () => {
            try {
              const company = await Company.findOne({ id });
              if (!company) return res(false);

              await Logo.insert({
                name: filename,
                type: mimetype,
                data: ('\\x' +
                  readFileSync(destination, { encoding: 'hex' })) as any,
                company: company,
              });
              unlinkSync(destination);
              res(true);
            } catch (error) {
              console.log(error);
              return res(false);
            }
          })
          .on('error', (error) => {
            console.log(error);
            rej(false);
          }),
      );
    });
    const result = await Promise.resolve(addLogoPromise);
    return result;
  }

  @Query(() => Logo)
  async getCompanyLogo(@Arg('id') id: number): Promise<Logo> {
    try {
      const doesCompanyExist = await Company.findOne({ where: { id } });

      if (!doesCompanyExist) throw new Error('Comapny does not exists');

      const logo = await Logo.findOne({ where: { company: id } });

      return logo;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
}
