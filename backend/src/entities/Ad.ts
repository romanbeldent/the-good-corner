import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
    @Field()
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

    @Field(() => [Picture])
    @OneToMany(() => Picture, (picture) => picture.ad, {
        cascade: true,
        eager: true,
    })
    pictures: Picture[];

    @Field()
    @Column()
    location: string;

    @Field()
    @Column()
    createdAt: Date;

    @Field(() => Category, { nullable: true })
    @ManyToOne(() => Category, category => category.ads, { eager: true })
    category: Category;

    @Field(() => [Tag], { nullable: true })
    @ManyToMany(() => Tag, tag => tag.ads, { eager: true })
    @JoinTable()
    tags: Tag[];
}