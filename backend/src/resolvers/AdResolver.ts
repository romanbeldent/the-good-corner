import AdInput from "../inputs/AdInput";
import UpdateAdInput from "../inputs/UpdateAdInput";
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

    @Mutation(() => String)
    async updateAd(
        @Arg("data") updateAdData: UpdateAdInput) {
        let adToUpdate = await Ad.findOneByOrFail({ id: updateAdData.id });
        console.log("ad to update", adToUpdate);
        adToUpdate = Object.assign(adToUpdate, updateAdData)
        console.log("ad to update", adToUpdate);
        const result = await adToUpdate.save();
        console.log(result);
        return "Ad has been updated";
    }

    @Mutation(() => String)
    async deleteAd(
        @Arg("id") id: number) {
        const result = await Ad.delete({ id })
        console.log("result", result.affected);
        if (result.affected === 1) {
            return "Ad has been deleted";
        } else {
            throw new Error("Ad has not been found")
        }
    }
}

export default AdResolver;