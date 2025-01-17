// sauveggarder email et mdp ->
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class ForgottenPassword extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Column()
    randomCode: string;

    @CreateDateColumn()
    createdAt: Date;
}