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
import moment from 'moment';
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

  @Field(() => String, { defaultValue: moment().format('DD-MM-YYYY') })
  date: string;

  @ManyToOne(() => JobOffer, (joboffer) => joboffer.cvs, {
    onDelete: 'CASCADE',
  })
  joboffer: JobOffer;

  @ManyToOne(() => User, (user) => user.cvs, { onDelete: 'CASCADE' })
  user: User;
}
