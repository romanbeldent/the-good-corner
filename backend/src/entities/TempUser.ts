import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class TempUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    hashedPassword: string;

    @Column()
    randomCode: string;
} 