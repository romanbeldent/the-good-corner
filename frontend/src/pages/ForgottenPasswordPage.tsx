import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgottenPasswordMutation } from "../generated/graphql-types";


const ForgottenPasswordPage = () => {
    type Inputs = {
        email: string;
    }

    const [forgottenPassword] = useForgottenPasswordMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        forgottenPassword({
            variables: { email: data.email },
            onCompleted: () => {
                navigate("/")
                toast.success("Veuillez consulter vos emails !")
            },
            onError: () => {
                toast.error("Cet email n'existe pas");
            }
        })
    };

    return (
        <>
            <h2>Rentrez votre email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="email"
                    type="text" 
                    {...register("email", { required: true })}
                    />
                {errors.email && <span>This field is required</span>}
                <br />
                <input type="submit" />
            </form>
        </>
    );
}
export default ForgottenPasswordPage;