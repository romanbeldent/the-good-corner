import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";

const LoginPage = ({
    setShowLogin,
}: {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [login] = useLoginMutation();
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
            onCompleted: () => {
                setShowLogin(false);
                navigate("/");
            },
            onError: (error) => {
                console.log("error", error)
            },
            refetchQueries: [{ query: GET_USER_INFO }]
        });
    };

    return (
        <div className="loginModalContainer">
            <div className="loginModalContent">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        defaultValue={"romanbeldent@gmail.com"}
                        placeholder="email"
                        {...register("login", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}

                    <input
                        defaultValue={"test"}
                        placeholder="password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}
                    <input type="submit" />
                </form>
                <Link className="button button-primary link-button" to={'/forgotten-password'} onClick={() => { setShowLogin(false) }}>Mot de passe oublié ?</Link>
            </div>
        </div>
    );
};

export default LoginPage;