import axios from "axios";
import { API_URL } from "../config";
import { CategoryProps } from "../components/CategoryCard";
import { useEffect, useState } from "react";

const NewAdFormPage = () => {
  const [categories, setCategory] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get(`${API_URL}/categories`);
        console.log(result.data);
        setCategory(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchCategories();
  }, []);

  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        axios.post(`${API_URL}/ads`, formJson)
        console.log(formJson);
      }}
    >
      <label>
        Titre de l'annonce:
        <br />
        <input className="text-field" type="text" name="title" />
      </label>
      <br />
      <label>
        Description:
        <br />
        <input className="text-field" type="text" name="description" />
      </label>
      <br />
      <label>
        Vendeur:
        <br />
        <input className="text-field" type="text" name="owner" />
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input className="text-field" type="number" name="price" />
      </label>
      <br />
      <label>
        URL de l'image:
        <br />
        <input className="text-field" type="text" name="picture" />
      </label>
      <br />
      <label>
        Publié le:
        <br />
        <input className="text-field" type="date" name="createdAt" />
      </label>
      <br />
      <label>
        Ville:
        <br />
        <input className="text-field" type="text" name="location" />
      </label>
      <br />
      <select name="category">
        {categories.map((el) =>
          <option value={el.id} key={el.id}>
            {el.name}
          </option>)}

      </select>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAdFormPage;
