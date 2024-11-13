import AdInput from "../inputs/AdInput";
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
    async createNewAd(@Arg("data") newAdData: AdInput) {
        const ad = new Ad();

        ad.title = newAdData.title;
        ad.description = newAdData.description;
        ad.owner = newAdData.owner;
        ad.price = newAdData.price;
        ad.location = newAdData.location;
        ad.createdAt = newAdData.createdAt;
        ad.category = newAdData.category;

        const result = await ad.save();

        const adWithCategory = await Ad.findOneByOrFail({ id: result.id })
        return adWithCategory;
    }
}

export default AdResolver;