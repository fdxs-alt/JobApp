import { User } from './User';
import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
@ObjectType()
@Entity()
export class Employer extends User {
  @Field()
  @Column('varchar', { nullable: false, length: 255 })
  company: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  surname: string;
}
