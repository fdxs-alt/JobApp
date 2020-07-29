import { Resolver, Mutation, UseMiddleware, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
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
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg('id', () => Number) id: number,
  ): Promise<boolean> {
    return new Promise((res, rej) => {
      createReadStream().pipe(
        createWriteStream(
          path.join(__dirname + `../../../images/${Date.now() + filename}`),
        )
          .on('finish', async () => {
            try {
              const jobOffer = await JobOffer.findOne({ id });
              if (!jobOffer) return rej(false);
              const newImage = Images.create({
                name: filename,
                type: mimetype,
                data: ('\\x' +
                  fs.readFileSync(
                    __dirname + `../../../images/${Date.now() + filename}`,
                    { encoding: 'hex' },
                  )) as any,
                joboffer: jobOffer,
              });
              await newImage.save();
              res(true);
            } catch (error) {
              return rej(false);
            }
          })
          .on('error', () => rej(false)),
      );
    });
  }
  @Mutation(() => Boolean)
  async addImages(
    @Arg('picture', () => [GraphQLUpload])
    pictures: [FileUpload],
    @Arg('id', () => Number) id: number,
  ): Promise<boolean> {
    const readableStreams = await Promise.all(pictures);

    readableStreams.map(async (readStreamInstance) => {
      const { filename, createReadStream, mimetype } = readStreamInstance;
      const destination = path.join(
        __dirname + `../../../images/${Date.now() + filename}`,
      );
      createReadStream().pipe(
        createWriteStream(destination).on('error', () => {
          throw new Error('Something went wrong');
        }),
      );

      try {
        const jobOffer = await JobOffer.findOne({ id });
        if (!jobOffer) throw new Error('User does not have such a company');
        await Images.insert({
          name: filename,
          type: mimetype,
          data: ('\\x' +
            fs.readFileSync(destination, { encoding: 'hex' })) as any,
          joboffer: jobOffer,
        });
      } catch (error) {
        throw new Error('Something went wrong');
      }
    });

    return true;
  }
}
