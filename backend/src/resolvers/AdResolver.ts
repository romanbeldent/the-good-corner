import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

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

    @Query(() => Ad)
    async getAdById(
        @Arg("id") id: number) {
        const ad = await Ad.findOneBy({ id: id })
        return ad;
    }

    @Mutation(() => Ad)
    async createNewAd(
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("owner") owner: string,
        @Arg("price") price: number,
        @Arg("picture") picture: string,
        @Arg("location") location: string,
    ) {
        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.price = price;
        ad.picture = picture;
        ad.location = location;
        ad.createdAt = new Date();

        const result = await ad.save();
        return result;
    }
}

export default AdResolver;