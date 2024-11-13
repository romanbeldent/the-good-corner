import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column({ length: 100 })
    @Length(10, 100, {
        message: "Entre 10 et 100 caractères"
    })
    description: string;

    @Field()
    @Column()
    owner: string

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    picture: string;

    @Field()
    @Column()
    location: string;

    @Field()
    @Column()
    createdAt: Date;

    @ManyToOne(() => Category, category => category.ads, { eager: true })
    category: Category;

    @ManyToMany(() => Tag, tag => tag.ads)
    @JoinTable()
    tags: Tag[];
}