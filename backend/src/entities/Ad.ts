import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column( {length: 100} )
    @Length(10, 100, {
        message: "Entre 10 et 100 caractères"
    })
    description: string;

    @Column()
    owner: string

    @Column()
    price: number;

    @Column()
    picture: string;

    @Column()
    location: string;

    @Column()
    createdAt: Date;
}