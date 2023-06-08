import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class friendships1685396657678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "friendships",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                        },
                        {
                            name: "friend_id",
                            type: "uuid"
                        },
                        {
                            name: "status",
                            type: "smallint"
                        },
                        {
                            name: "friendship_date",
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
                            name: "FKUserFriend",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            onDelete: "CASCADE",
                            onUpdate: "CASCADE",
                        },
                        {
                            name: "FKFriendUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["friend_id"],
                            onDelete: "CASCADE",
                            onUpdate: "CASCADE",
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("friendships");
    }

}
