import { Resolver, Mutation, UseMiddleware, Arg, Query } from 'type-graphql';
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
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
    @Arg('id', () => Number) id: number,
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file;
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg')
      throw new Error('Specifiy right format!');
    const destination = path.join(
      __dirname + `../../images/${Date.now() + filename}`,
    );
    const p = new Promise<boolean>((res, rej) => {
      createReadStream().pipe(
        createWriteStream(destination)
          .on('finish', async () => {
            try {
              const jobOffer = await JobOffer.findOne({ id });

              if (!jobOffer) return res(false);

              await Images.insert({
                name: filename,
                type: mimetype,
                data: ('\\x' +
                  fs.readFileSync(destination, { encoding: 'hex' })) as any,
                joboffer: jobOffer,
              });
              fs.unlinkSync(destination);
              res(true);
            } catch (error) {
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
  @Mutation(() => [Boolean])
  async addImages(
    @Arg('picture', () => [GraphQLUpload])
    pictures: [FileUpload],
    @Arg('id', () => Number) id: number,
  ): Promise<boolean[]> {
    const readableStreams = await Promise.all(pictures);

    const p = readableStreams.map(async (readStreamInstance) => {
      const { filename, createReadStream, mimetype } = readStreamInstance;
      const destination = path.join(
        __dirname + `../../images/${Date.now() + filename}`,
      );
      return new Promise<boolean>((res, rej) => {
        createReadStream().pipe(
          createWriteStream(destination)
            .on('finish', async () => {
              try {
                const jobOffer = await JobOffer.findOne({ id });
                if (!jobOffer) res(false);
                await Images.insert({
                  name: filename,
                  type: mimetype,
                  data: ('\\x' +
                    fs.readFileSync(destination, { encoding: 'hex' })) as any,
                  joboffer: jobOffer,
                });

                res(true);
              } catch (error) {
                res(false);
              }
            })
            .on('error', () => {
              rej(false);
            }),
        );
      });
    });

    const results = await Promise.all(p);
    return results;
  }
  @UseMiddleware(EmployerAuthMiddleware)
  @Mutation(() => Boolean)
  async deleteImage(@Arg('id') id: number): Promise<boolean> {
    try {
      const imageToDelete = await Images.findOne({ id });
      await imageToDelete.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
  @Query(() => [Images])
  async getAllJobOfferImages(@Arg('id') id: number) {
    try {
      const joboffer = await JobOffer.findOne({ id });
      if (!joboffer) throw new Error("Can't identify the offer");
      const images = await Images.find({ joboffer });

      return images;
    } catch (error) {
      throw new Error('An error occured');
    }
  }
}
