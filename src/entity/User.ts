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
  @Column('varchar', { length: 255, unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Field()
  @Column('boolean', { default: false })
  confirmed: boolean;

  @BeforeInsert()
  createId(): void {
    this.id = uuidv4();
  }
}
