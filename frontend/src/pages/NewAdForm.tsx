import axios from "axios";
import { API_URL } from "../config";
import { CategoryProps } from "../components/CategoryCard";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdCardProps } from "../components/AdCard";

type Tags = {
  id: number;
  name: string;
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([] as Tags[]);
  const [categories, setCategory] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get(`${API_URL}/categories`);
        setCategory(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    const fetchTags = async () => {
      try {
        const result = await axios.get(`${API_URL}/tags`);
        setTags(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchTags();
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdCardProps>();
  const onSubmit: SubmitHandler<AdCardProps> = async (data) => {
    try {
      console.log("data from react hook form", data);
      const dataForBackend = {
        ...data,
        tags: data.tags.map((el) => ({ id: el })),
      };
      console.log(dataForBackend);
      await axios.post(`${API_URL}/ads`, dataForBackend);
      toast.success("Ad has been added");
      navigate("/");
    } catch (err) {
      console.log("err", err)
    }
  };

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
        <input className="text-field" {...register("picture")} />
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
        {categories.map((el) => (
          <Fragment key={el.id}>
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
        {tags.map((el) => (
          <Fragment key={el.id}>
            <label>
              <input type="checkbox" value={el.id} {...register("tags")} />
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

export default NewAdFormPage;
