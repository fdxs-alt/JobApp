import { Resolver, Mutation, UseMiddleware, Arg } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../types-graphql/Upload';
import { EmployerAuthMiddleware } from '../utils/EmployerAuthMiddleware';
import { createWriteStream } from 'fs';
import { JobOffer } from '../entity/JobOffer';
import { Images } from '../entity/Images';
import fs from 'fs';
import path from 'path';
@Resolver()
export class ImageResolver {
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Boolean)
  async addImage(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename, mimetype }: Upload,
    @Arg('id') id: number,
  ): Promise<boolean> {
    return new Promise((res, rej) => {
      createReadStream().pipe(
        createWriteStream(path.join(__dirname + `../../../images/${filename}`))
          .on('finish', async () => {
            try {
              console.log(id);
              const jobOffer = await JobOffer.findOne({ id });
              if (!jobOffer) rej(false);
              const newImage = await Images.create({
                name: filename,
                type: mimetype,
                data: fs.readFileSync(
                  __dirname + `../../../images/${filename}`,
                ),
                joboffer: jobOffer,
              });
              await newImage.save();
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
