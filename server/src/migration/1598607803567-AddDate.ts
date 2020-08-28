/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDate1598607803567 implements MigrationInterface {
    name = 'AddDate1598607803567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "date" SET DEFAULT '28-08-2020'`);
        await queryRunner.query(`ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '28-08-2020'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '24-08-2020'`);
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "date" SET DEFAULT '24-08-2020'`);
        
    }

}
