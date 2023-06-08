import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class events1685402418595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "events",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "text"
                        },
                        {
                            name: "status",
                            type: "smallint"
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                        },
                        {
                            name: "event_date",
                            type: "timestamp",
                        },
                        {
                            name: "event_type_id",
                            type: "uuid",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ],

                    foreignKeys: [
                        {
                            name: "FKEventTypes",
                            referencedTableName: "event_types",
                            referencedColumnNames: ["id"],
                            columnNames: ["event_type_id"],
                            onDelete: "RESTRICT",
                            onUpdate: "RESTRICT",
                        },
                        {
                            name: "FKEventUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL ",
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events");
    }

}
