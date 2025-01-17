import AdInput from "../inputs/AdInput";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { Ad } from "../entities/Ad";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { FindManyOptions, Like } from "typeorm";
import { User } from "../entities/User";

@Resolver(Ad)
class AdResolver {
    @Query(() => [Ad])
    async AllAds(
        @Arg("title", { nullable: true }) title?: string,
        @Arg("category", { nullable: true }) category?: string
    ) {
        let ads: Ad[] = [];
        let findOptions: FindManyOptions<Ad> = {
            order: {
                id: "DESC",
            },
        };
        if (title) {
            findOptions.where = { title: Like(`%${title}%`) };
        }
        if (category) {
            findOptions.where = { category: { name: category } };
        }

        ads = await Ad.find(findOptions);
        return ads;
    }

    @Query(() => Ad)
    async getAdById(@Arg("id") id: number) {
        const ad = await Ad.findOneBy({ id });
        return ad;
    }

    @Authorized()
    @Mutation(() => Ad)
    async createNewAd(
        @Arg("data") newAdData: AdInput,
        @Ctx() context: any) {
        console.log("context of create new ad mutation", context);
        const userFromContext = await User.findOneByOrFail({
            email: context.email
        });
        const newAdToSave = Ad.create({
            ...newAdData,
            user: userFromContext
        });

        const result = await newAdToSave.save();
        const adWithCategory = await Ad.findOneByOrFail({ id: result.id });
        return adWithCategory;
    }

    @Mutation(() => String)
    async updateAd(
        @Arg("data") updateAdData: UpdateAdInput,
        @Ctx() context: any
    ) {
        let adToUpdate = await Ad.findOneByOrFail({ id: updateAdData.id });
        if (adToUpdate.user.email !== context.email) {
            throw new Error ("Unauthorized");
        }
        console.log("ad to update", adToUpdate);

        adToUpdate = Object.assign(adToUpdate, updateAdData);
        console.log("ad to update after update", adToUpdate);

        await adToUpdate.save();
        return "Ad has been updated";
    }

    @Authorized("ADMIN")
    @Mutation(() => String)
    async deleteAd(@Arg("id") id: number) {
        const result = await Ad.delete({ id });
        console.log("result", result.affected);

        if (result.affected === 1) {
            return "Ad has been deleted";
        } else {
            throw new Error("Ad has not been found");
        }
    }
}

export default AdResolver;
