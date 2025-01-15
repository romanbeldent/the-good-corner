import { Ad } from "../entities/Ad";
import { Picture } from "../entities/Picture";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class PictureInput implements Partial<Picture> {
  @Field()
  url: string;
}

@InputType()
export class TagInput {
  @Field()
  id: number;
}

@InputType()
class AdInput implements Partial<Ad> {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    price: number;

    @Field()
    location: string;

    @Field()
    createdAt: Date;

    @Field(() => [PictureInput], { nullable: true })
    pictures?: Picture[];

    @Field(() => ID)
    category: Category;

    @Field(() => [TagInput], { nullable: true })
    tags: Tag[];
}

export default AdInput;