import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatSchema1644254474771 implements MigrationInterface {
  name = 'ChatSchema1644254474771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`password\` varchar(500) NOT NULL, \`phone\` varchar(500) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`message\` (\`id\` varchar(36) NOT NULL, \`text\` text NULL, \`file\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`chatId\` varchar(36) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chats_users\` (\`chatId\` varchar(36) NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_66ac6097a8aa0d71f48e6afae3\` (\`chatId\`), INDEX \`IDX_70be128da7c0e5b83d0f2b5c48\` (\`userId\`), PRIMARY KEY (\`chatId\`, \`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chats_users\` ADD CONSTRAINT \`FK_66ac6097a8aa0d71f48e6afae3c\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chats_users\` ADD CONSTRAINT \`FK_70be128da7c0e5b83d0f2b5c489\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`chats_users\` DROP FOREIGN KEY \`FK_70be128da7c0e5b83d0f2b5c489\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chats_users\` DROP FOREIGN KEY \`FK_66ac6097a8aa0d71f48e6afae3c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_70be128da7c0e5b83d0f2b5c48\` ON \`chats_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_66ac6097a8aa0d71f48e6afae3\` ON \`chats_users\``,
    );
    await queryRunner.query(`DROP TABLE \`chats_users\``);
    await queryRunner.query(`DROP TABLE \`chat\``);
    await queryRunner.query(`DROP TABLE \`message\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
