import axios from "axios";
import { API_URL } from "../config";

const NewCategoryFormPage = () => {

  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        axios.post(`${API_URL}/categories`, formJson)
        console.log(formJson);
      }}
    >
      <label>
        Titre de le la catégorie:
        <br />
        <input className="text-field" type="text" name="name" />
      </label>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewCategoryFormPage;
