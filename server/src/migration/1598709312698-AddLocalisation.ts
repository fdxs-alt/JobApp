/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocalisation1598709312698 implements MigrationInterface {
    name = 'AddLocalisation1598709312698'

    public async up(queryRunner: QueryRunner): Promise<void> {
     
        await queryRunner.query(`ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '29-08-2020'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "localisation"`);
    }

}
