import { useForm, SubmitHandler } from "react-hook-form"
import { useLoginLazyQuery } from "../generated/graphql-types"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [login] = useLoginLazyQuery();
    type Inputs = {
        login: string
        password: string
    }
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("data", data);
        login({
            variables: { data: { email: data.login, password: data.password } },
            onCompleted: (result) => {
                console.log("result", result);
                localStorage.setItem("token", result.login);
                navigate("/");
            },
            onError: (error) => {
                console.log("error", error)
            }
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="email" {...register("login", { required: true })} />
            {errors.login && <span>This field is required</span>}
            <input placeholder="password" type="password" {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}
            <input type="submit" />
        </form>
    )
}

export default LoginPage;