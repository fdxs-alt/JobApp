import { User } from './User';
import { Entity, Column } from 'typeorm';

@Entity()
export class Employer extends User {
    @Column('varchar', { nullable: false, length: 255 }) company: string;
}
