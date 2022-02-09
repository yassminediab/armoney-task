import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarToUser1644254996365 implements MigrationInterface {
  name = 'AddAvatarToUser1644254996365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`avatar\` varchar(500) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
  }
}
