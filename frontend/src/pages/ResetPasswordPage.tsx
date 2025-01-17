import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../generated/graphql-types";

const ResetPasswordPage = () => {
    type Inputs = {
        code: string;
        password: string;
    }

    const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate();
    const { code } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        resetPassword({
            variables: { code: data.code, password: data.password },
            onCompleted: () => {
                navigate("/")
                toast.success("Votre mot de passe a bien été modifié !")
            },
            onError: () => {
                toast.error("Le lien de réinitialisation du mot de passe a expiré");
            }
        })
    };

    return (
        <> 
            <h2>Veuillez entrer votre nouveau mot de passe</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    defaultValue={code}
                    type="hidden"
                    {...register("code", { required: true })}
                />
                <input
                    placeholder="password"
                    type="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
                <br/>
                <input type="submit" />
            </form>
        </>
    );
}

export default ResetPasswordPage;