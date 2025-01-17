import "dotenv/config";
import { User } from "../entities/User";
import { ForgottenPassword } from "../entities/ForgottenPassword";
import { TempUser } from "../entities/TempUser";
import { UserInput } from "../inputs/UserInput";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Resend } from 'resend';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
class UserInfo {
    @Field()
    isLoggedIn: boolean;

    @Field({ nullable: true })
    email?: String;
}

@Resolver(User)
class UserResolver {
    @Mutation(() => String)
    async register(@Arg("data") newUserData: UserInput) {
        const randomCode = uuidv4();
        const result = await TempUser.save({
            email: newUserData.email,
            hashedPassword: await argon2.hash(newUserData.password),
            randomCode: randomCode,
        });

        const resend = new Resend(process.env.RESEND_API_KEY);
        (async function () {
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [newUserData.email],
                subject: 'Verify email',
                html: `
                <p>Please click the link below to confirm your email adress</p>
                <a href=${process.env.URL_CONFIRMATION_PAGE}${randomCode}>
                ${process.env.URL_CONFIRMATION_PAGE}${randomCode}</a>
                `,
            });

            if (error) {
                return console.error({ error });
            }

            console.log({ data });
        })();

        console.log(result)
        return "The user was created";
    }

    @Mutation(() => String)
    async login(@Arg("data") loginUserData: UserInput, @Ctx() context: any) {
        let isPasswordCorrect = false;
        const user = await User.findOneBy({
            email: loginUserData.email
        });
        if (user) {
            isPasswordCorrect = await argon2.verify(
                user.hashedPassword,
                loginUserData.password
            );
        } else {
            throw new Error("User does not exist")
        }
        if (isPasswordCorrect === true && user !== null) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userRole: user.role
                },
                process.env.JWT_SECRET_KEY as jwt.Secret
            );
            context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
            return "ok";
        } else {
            throw new Error("Invalid password");
        }
    }

    @Mutation(() => String)
    async logout(@Ctx() context: any) {
        context.res.setHeader("Set-Cookie", `token=; Secure; HttpOnly; Max-Age=0`);
        return "logged out";
    }

    @Query(() => UserInfo)
    async getUserInfo(@Ctx() context: any) {
        if (context.email) {
            return { isLoggedIn: true, email: context.email }
        } else {
            return { isLoggedIn: false };
        }
    }

    @Mutation(() => String)
    async confirmEmail(@Arg("codeByUser") codeByUser: string) {
        const tempUser = await TempUser.findOneByOrFail({ randomCode: codeByUser })
        await User.save({
            email: tempUser.email,
            hashedPassword: tempUser.hashedPassword,
        });
        tempUser.remove()
        return "ok";
    }

    @Mutation(() => String)
    async forgottenPassword(@Arg("email") userEmail: string) {
        const userExists = await User.findOneByOrFail({ email: userEmail })
        if (userExists) {
            const randomCode = uuidv4();
            const result = await ForgottenPassword.save({
                email: userEmail,
                randomCode: randomCode,
            });

            const resend = new Resend(process.env.RESEND_API_KEY);
            (async function () {
                const { data, error } = await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: [userExists.email],
                    subject: 'Reset password',
                    html: `
                <p>Please click the link below to reset your password</p>
                <a href=${process.env.URL_RESET_PASSWORD_PAGE}${randomCode}>
                ${process.env.URL_RESET_PASSWORD_PAGE}${randomCode}</a>
                `,
                });

                if (error) {
                    return console.error({ error });
                }

                console.log({ data });
            })();
            console.log(result)
        }
        return "Email found";
    }

    @Mutation(() => String)
    async resetPassword(
        @Arg("code") code: string,
        @Arg("password") password: string
    ) {
        const forgottenPasswordUser = await ForgottenPassword.findOneByOrFail({
            randomCode: code,
        });
        const miliseconds =
            Date.now() - Date.parse(forgottenPasswordUser.createdAt.toUTCString());
        const minutes = miliseconds / 1000 / 60;
        if (minutes > 5) {
            forgottenPasswordUser.remove();
            throw Error("The link has expired");
        }
        const user = await User.findOneByOrFail({
            email: forgottenPasswordUser.email,
        });
        user.hashedPassword = await argon2.hash(password);
        user.save();
        forgottenPasswordUser.remove();
        return "ok";
    }
}

export default UserResolver;