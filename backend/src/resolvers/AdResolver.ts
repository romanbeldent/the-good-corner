import { Ad } from "../entities/Ad";
import { Query, Resolver } from "type-graphql";

@Resolver(Ad)
export class AdResolver {
    @Query(() => [Ad])
    async AllAds() {
        const ads = await Ad.find({
            order: {
                category: { name: "ASC" }
            },
        })
        return ads;
    }
}