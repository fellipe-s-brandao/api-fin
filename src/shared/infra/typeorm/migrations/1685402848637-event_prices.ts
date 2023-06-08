import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class eventPrices1685402848637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "event_prices",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "event_id",
                            type: "uuid",
                        },
                        {
                            name: "price",
                            type: "numeric"
                        },
                        {
                            name: "lot_start_date",
                            type: "timestamp",
                        },
                        {
                            name: "lot_end_date",
                            type: "timestamp",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ],

                    foreignKeys: [
                        {
                            name: "FKEventPrices",
                            referencedTableName: "events",
                            referencedColumnNames: ["id"],
                            columnNames: ["event_id"],
                            onDelete: "RESTRICT",
                            onUpdate: "RESTRICT",
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_prices");
    }

}
