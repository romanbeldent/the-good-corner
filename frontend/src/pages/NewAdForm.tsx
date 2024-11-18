import { CategoryProps } from "../components/CategoryCard";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TagProps } from "../components/TagCard";
import { useAllTagsAndCategoriesQuery, useMutationMutation } from "../generated/graphql-types";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: string;
  picturesUrls: string[];
  location: string;
  createdAt: Date;
  category: string;
  tags: string[];
};

const NewAdFormPage = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useAllTagsAndCategoriesQuery();
  const [createAd] = useMutationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("data from react hook form", data);
      const dataForBackend = {
        ...data,
        price: parseInt(data.price),
        createdAt: data.createdAt + "T00:00:00.000Z",
        tags: data.tags ? data.tags : [],
      }
      createAd({
        variables: { data: dataForBackend },
      })
      toast.success("Ad has been added");
      navigate("/");
    } catch (err) {
      console.log("err", err)
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) {

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field"
            {...register("title", {
              required: "Ce champ doit être rempli",
            })}
          />
          {errors.title && <span>{errors.title.message}<br /></span>}
        </label>
        <br />
        <label>
          Description:
          <br />
          <input className="text-field"
            {...register("description", {
              minLength: { value: 10, message: "Minimum 10 characters" },
              maxLength: { value: 100, message: "Maximum 100 characters" },
              required: "This field is required",
            })}
          />
          {errors.description && <span>La description doit contenir entre 10 et 100 caractères<br /></span>}
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input className="text-field" {...register("owner")} />
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input className="text-field" type="number" {...register("price")} />
        </label>
        <br />
        <label>
          URL de l'image:
          <br />
          <input className="text-field" {...register("picturesUrls")} />
        </label>
        <br />
        <label>
          Publié le:
          <br />
          <input className="text-field" type="date" {...register("createdAt")} />
        </label>
        <br />
        <label>
          Ville:
          <br />
          <input className="text-field" {...register("location")} />
        </label>
        <br />
        <select {...register("category")}>
          {data.AllCategories.map((el: CategoryProps) => (
            <Fragment>
              <option value={el.id} key={el.id} >
                {el.name}
              </option>
            </Fragment>
          ))}
        </select>
        <br />
        <>
          <br />
          Tags :
          <br />
          {data.AllTags.map((el: TagProps) => (
            <Fragment>
              <label>
                <input key={el.id} type="checkbox" value={el.id} {...register("tags")} />
                {el.name}
              </label>
              <br />
            </Fragment>
          ))}
        </>
        <input type="submit" className="button" />
      </form >
    );
  };
}

export default NewAdFormPage;
