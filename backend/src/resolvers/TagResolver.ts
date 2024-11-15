import { Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";

@Resolver(Tag)
export class TagResolver {
    @Query(() => [Tag])
    async AllTags() {
        const tags = await Tag.find({
            order: {
                name: "ASC"
            }
        })
        return tags;
    }
}

export default TagResolver;