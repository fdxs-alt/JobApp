import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Company } from './CompanyDetails';

@Entity()
@ObjectType()
export class Logo extends BaseEntity {
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

  @Field(() => Company)
  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
