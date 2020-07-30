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

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.joboffers, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @Field(() => [Images])
  @OneToMany(() => Images, (image) => image.joboffer)
  image: Images;

  @Field(() => [Cv])
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv;
}
