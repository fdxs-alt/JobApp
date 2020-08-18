import { Field, ObjectType, ID } from 'type-graphql';
import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';
import { JobOffer } from './JobOffer';

@ObjectType()
@Entity()
export class Images extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  type: string;

  @Field(() => [String])
  @Column('bytea')
  data: Buffer;

  @ManyToOne(() => JobOffer, (joboffer) => joboffer.image, {
    onDelete: 'CASCADE',
  })
  joboffer: JobOffer;
}
