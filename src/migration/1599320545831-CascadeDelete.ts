/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeDelete1599320545831 implements MigrationInterface {
  name = 'CascadeDelete1599320545831';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logo" DROP CONSTRAINT "FK_88647d69908702595f538d41c18"`,
    );

    await queryRunner.query(
      `ALTER TABLE "logo" ADD CONSTRAINT "FK_88647d69908702595f538d41c18" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logo" DROP CONSTRAINT "FK_88647d69908702595f538d41c18"`,
    );

    await queryRunner.query(
      `ALTER TABLE "logo" ADD CONSTRAINT "FK_88647d69908702595f538d41c18" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
