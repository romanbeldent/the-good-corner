import axios from "axios";
import { API_URL } from "../config";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";

type Inputs = {
  name: string;
}

const NewCategoryFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post(`${API_URL}/categories`, data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de la catégorie:
          <br />
          <input
            className="text-field"
            {...register("name", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewCategoryFormPage;
