import { MigrationInterface, QueryRunner } from 'typeorm';



export class JobOffers1598202333661 implements MigrationInterface {

  name = 'JobOffers1598202333661';



  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `ALTER TABLE "job_offer" ADD "date" character varying NOT NULL DEFAULT '23-08-2020'`,

    );
    await queryRunner.query(
      `ALTER TABLE "job_offer" ADD "main" character varying`,

    );
    await queryRunner.query(
      `ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '23-08-2020'`,
    );

  }



  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `ALTER TABLE "opinion" ALTER COLUMN "date" SET DEFAULT '21-08-2020'`,

    );
    await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "main"`);

    await queryRunner.query(`ALTER TABLE "job_offer" DROP COLUMN "date"`);

  }

}

