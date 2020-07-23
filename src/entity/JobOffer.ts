import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './CompanyDetails';
@Entity()
export class JobOffer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('varchar', { length: 255, array: true })
    mandatory: string[];

    @Column('varchar', { array: true, length: 255 })
    extraSkills: string[];

    @Column('text', { array: true })
    tasks: string[];

    @Column('varchar', { array: true, length: 255 })
    benefitsInWork: string[];

    @Column('integer')
    minSalary: number;

    @Column('integer')
    maxSalary: number;

    @Column('boolean', { default: false })
    onlineRecrutation: boolean;

    @ManyToOne(() => Company, (company) => company.joboffers)
    company: Company;
}
