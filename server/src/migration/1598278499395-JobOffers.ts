/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class JobOffers1598278499395 implements MigrationInterface {
    name = 'JobOffers1598278499395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "mandatory"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "mandatory" character varying(255) array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "extraSkills"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "extraSkills" character varying(255) array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "benefitsInWork"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "benefitsInWork" character varying(255) array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "date" SET DEFAULT '24-08-2020'`);
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "main" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '24-08-2020'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '23-08-2020'`);
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "main" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" ALTER COLUMN "date" SET DEFAULT '23-08-2020'`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "benefitsInWork"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "benefitsInWork" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "extraSkills"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "extraSkills" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "mandatory"`);
        await queryRunner.query(`ALTER TABLE "job_offer" ADD "mandatory" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "description"`);
    }

}
