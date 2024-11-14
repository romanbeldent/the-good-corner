import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CategoryInput from "../inputs/CategoryInput";
import { Category } from "../entities/Category";
import UpdateCategoryInput from "../inputs/UpdateCategoryInput";

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    async AllCategories() {
        const categories = await Category.find({
            order: {
                name: "ASC"
            }
        })
        return categories;
    }

    @Query(() => Category)
    async getCategoryById(
        @Arg("id") id: number) {
        const category = await Category.findOneBy({ id: id })
        return category;
    }

    @Mutation(() => Category)
    async createNewCategory(@Arg("data") newCategoryData: CategoryInput) {
        const category = new Category();

        category.name = newCategoryData.name;

        const result = await category.save();
        return result;
    }

    @Mutation(() => String)
    async updateCategory(
        @Arg("data") updateAdData: UpdateCategoryInput) {
        let categoryToUpdate = await Category.findOneByOrFail({ id: updateAdData.id });
        console.log("category to update", categoryToUpdate);
        categoryToUpdate = Object.assign(categoryToUpdate, updateAdData)
        console.log("category to update", categoryToUpdate);
        const result = await categoryToUpdate.save();
        console.log(result);
        return "Category has been updated";
    }

    @Mutation(() => String)
    async deleteCategory(
        @Arg("id") id: number) {
        const result = await Category.delete({ id })
        console.log("result", result.affected);
        if (result.affected === 1) {
            return "Category has been deleted";
        } else {
            throw new Error("Category has not been found")
        }
    }
}

export default CategoryResolver;