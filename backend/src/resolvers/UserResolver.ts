import { UserInput } from "../inputs/UserInput";
import { User } from "../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

@Resolver(User)
class UserResolver {
    @Mutation(() =>String)
    async register(@Arg("data") newUserData: UserInput) {
        const result = await User.save({
            email: newUserData.email,
            hashedPassword: await argon2.hash(newUserData.password),
        })
        console.log(result)
        return "ok";
    }
}

export default UserResolver;