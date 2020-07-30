import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';
import { JobOffer } from './JobOffer';
import { User } from './User';

@ObjectType()
@Entity()
export class Cv extends BaseEntity {
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

  @ManyToOne(() => JobOffer, (joboffer) => joboffer.cvs, {
    onDelete: 'CASCADE',
  })
  joboffer: JobOffer;

  @ManyToOne(() => User, (user) => user.cvs, { onDelete: 'CASCADE' })
  user: User;
}
