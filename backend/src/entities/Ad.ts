import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ length: 100 })
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

    @ManyToOne(() => Category, category => category.ads, { eager: true })
    category: Category;

    @ManyToMany(() => Tag, tag => tag.ads, { cascade: true })
    @JoinTable()
    tags: Tag[];
}