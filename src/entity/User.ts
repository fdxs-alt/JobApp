import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Field, ObjectType } from 'type-graphql';
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text')
  password: string;

  @Field()
  @Column('boolean', { default: false })
  confirmed: boolean;

  @Field()
  @Column('boolean', { default: false })
  hasCompany: boolean;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field()
  @Column('varchar', { length: 255, nullable: true })
  companyName: string;

  @Field()
  @Column('varchar', { length: 255 })
  surname: string;

  @Field()
  @Column('varchar', { length: 255 })
  fullName: string;

  @BeforeInsert()
  createIdandName(): void {
    this.id = uuidv4();
    this.fullName = this.name + ' ' + this.surname;
  }
}
