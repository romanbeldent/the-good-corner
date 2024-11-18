import AdInput from "../inputs/AdInput";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Picture } from "../entities/Picture";

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
        const pictures: Picture[] = [];
        if (newAdData.picturesUrls) {
            newAdData.picturesUrls.forEach((el) => {
                const newPicture = new Picture();
                newPicture.url = el
                pictures.push(newPicture);
            })
        }

        const newAdToSave = Ad.create({
            ...newAdData,
            pictures,
            tags: newAdData.tags.map((el) => ({ id: parseInt(el) }))
        });
        console.log(
            "new ad to save tags",
            JSON.stringify(newAdToSave.tags, null, 2)
        );
        const result = await newAdToSave.save();

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