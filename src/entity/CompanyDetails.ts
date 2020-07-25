import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { JobOffer } from './JobOffer';
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, length: 255 })
  companyName: string;

  @Column('smallint', { nullable: false })
  yearOfSetUp: number;

  @Column('smallint', { nullable: false })
  sizeOfCompany: number;

  @Column('varchar', { length: 255, nullable: false })
  localisation: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false, array: true })
  technologies: string[];

  @Column('varchar', { nullable: false, array: true })
  benefits: string[];

  @OneToOne(() => User)
  @JoinColumn()
  employer: Promise<User>;

  @OneToMany(() => JobOffer, (joboffer) => joboffer.company)
  joboffers: Promise<JobOffer>;
}
