import { Resolver, Mutation, UseMiddleware, Arg } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { Upload } from '../types-graphql/Upload';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';
import { createWriteStream } from 'fs';
import { JobOffer } from '../entity/JobOffer';
import { Images } from '../entity/Images';
import fs from 'fs';
@Resolver()
export class ImageResolver {
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Boolean)
  async addImage(
    @Arg('input', () => GraphQLUpload)
    { createReadStream, id, filename, mimetype }: Upload,
  ): Promise<boolean> {
    return new Promise((res, rej) => {
      createReadStream().pipe(
        createWriteStream(__dirname + `../../../images/${filename}`)
          .on('finish', async () => {
            try {
              const jobOffer = await JobOffer.findOne({ id });
              await Images.create({
                name: filename,
                type: mimetype,
                data: fs.readFileSync(
                  __dirname + `../../../images/${filename}`,
                ),
                joboffer: jobOffer,
              });
              res(true);
            } catch (error) {
              rej(false);
            }
          })
          .on('error', () => rej(false)),
      );
    });
  }
}
// '{"query":"mutation AddImage($picture: Upload!) {\n  addImage(input: $picture)\n}\n"}';
