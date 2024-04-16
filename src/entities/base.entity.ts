import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createadAt!: Date;

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt!: Date;
}

//id
//created_at
//updated_at