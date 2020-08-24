import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Company } from './CompanyDetails';
import { Field, ObjectType } from 'type-graphql';
import { Images } from './Images';
import { Cv } from './Cv';
import moment from 'moment';
@ObjectType()
@Entity()
export class JobOffer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  title: string;

  @Field(() => [String])
  @Column('varchar', { length: 255, array: true })
  mandatory: string[];

  @Field(() => [String])
  @Column('varchar', { array: true, length: 255 })
  extraSkills: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  tasks: string[];

  @Field(() => [String])
  @Column('varchar', { array: true, length: 255 })
  benefitsInWork: string[];

  @Field()
  @Column('integer')
  minSalary: number;

  @Field()
  @Column('integer')
  maxSalary: number;

  @Field()
  @Column('boolean', { default: false })
  onlineRecrutation: boolean;

  @Field()
  @Column({ type: 'varchar', default: moment().format('DD-MM-YYYY') })
  date: string;

  @Field()
  @Column({ type: 'varchar' })
  main: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.joboffers, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @OneToMany(() => Images, (image) => image.joboffer)
  image: Images;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv;
}
