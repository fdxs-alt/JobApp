import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import moment from 'moment';
import { Company } from './CompanyDetails';
import { User } from './User';

@ObjectType()
@Entity()
export class Opinion extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'varchar', default: moment().format('DD-MM-YYYY') })
  date: string;

  @ManyToOne(() => Company, (company) => company.opinions, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ManyToOne(() => User, (user) => user.opinions, { onDelete: 'CASCADE' })
  user: User;
}
