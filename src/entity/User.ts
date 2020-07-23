import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column('varchar', { length: 255, unique: true, nullable: false }) email: true;

    @Column('text', { nullable: false }) password: string;

    @Column('boolean', { default: false }) confirmed: boolean;
    @BeforeInsert()
    createId(): void {
        this.id = uuidv4();
    }
}
