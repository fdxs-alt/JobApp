import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from './User';
import { JobOffer } from './JobOffer';
import { Field, ObjectType } from 'type-graphql';
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false, length: 255 })
  companyName: string;

  @Field()
  @Column('smallint', { nullable: false })
  yearOfSetUp: number;

  @Field()
  @Column('smallint', { nullable: false })
  sizeOfCompany: number;

  @Field()
  @Column('varchar', { length: 255, nullable: false })
  localisation: string;

  @Field()
  @Column('text', { nullable: false })
  description: string;

  @Field(() => [String])
  @Column('varchar', { nullable: false, array: true })
  technologies: string[];

  @Field(() => [String])
  @Column('varchar', { nullable: false, array: true })
  benefits: string[];

  @Field()
  @OneToOne(() => User)
  @JoinColumn()
  employer: User;

  @Field(() => [JobOffer])
  @OneToMany(() => JobOffer, (joboffer) => joboffer.company)
  joboffers: JobOffer;
}
