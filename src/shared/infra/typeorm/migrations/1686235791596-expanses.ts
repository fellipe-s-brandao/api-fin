import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class expanses1686235791596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expanses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'amountSpent',
            type: 'numeric',
          },
          {
            name: 'expenseTypeId',
            type: 'uuid',
          },
          {
            name: 'expenseDate',
            type: 'timestamp',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],

        foreignKeys: [
          {
            name: 'FKUserExpanse',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKExpanseTypes',
            referencedTableName: 'expanseTypes',
            referencedColumnNames: ['id'],
            columnNames: ['expenseTypeId'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('expanses')
  }
}
