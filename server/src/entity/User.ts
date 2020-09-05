import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Field, ObjectType } from 'type-graphql';
import { Cv } from './Cv';
import { Opinion } from './Opinions';
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

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 255, nullable: true })
  companyName?: string;

  @Field()
  @Column('varchar', { length: 255 })
  surname: string;

  @Field()
  @Column('varchar', { length: 255 })
  fullName: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field(() => [Cv])
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv;

  @OneToMany(() => Opinion, (opinion) => opinion.user)
  opinions: Opinion;

  @BeforeInsert()
  createIdandName(): void {
    this.id = uuidv4();
    this.fullName = this.name + ' ' + this.surname;
  }
}
