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
                data: fs.readFileSync(
                  __dirname + `../../../images/${Date.now() + filename}`,
                ),
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
  ): Promise<boolean[] | boolean> {
    const readableStreams = await Promise.all(pictures);

    const b = readableStreams.map((readStreamInstance) => {
      const { filename, createReadStream, mimetype } = readStreamInstance;
      const destination = path.join(
        __dirname + `../../../images/${Date.now() + filename}`,
      );
      return new Promise<boolean>((res, rej) => {
        createReadStream().pipe(
          createWriteStream(destination)
            .on('finish', async () => {
              try {
                const jobOffer = await JobOffer.findOne({ id });
                if (!jobOffer) return rej(false);
                await Images.create({
                  name: filename,
                  type: mimetype,
                  data: fs.readFileSync(destination),
                  joboffer: jobOffer,
                }).save();

                return rej(false);
              } catch (error) {
                console.log(error);
                rej(false);
              }
            })
            .on('error', (error) => {
              console.log(error);
              rej(false);
            }),
        );
      });
    });
    const result = await Promise.all(b).catch(() => false);
    return result;
  }
}
