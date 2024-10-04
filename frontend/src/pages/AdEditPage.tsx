import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";
import { CategoryProps } from "../components/CategoryCard";
import { toast } from "react-toastify";

const AdEditForm = () => {
    const notify = () => toast("L'annonce a bien été mis à jour !")
    const { id } = useParams();
    const [adData, setAd] = useState<AdCardProps>();
    useEffect(() => {
        const fetchAd = async () => {
            try {
                const result = await axios.get(`${API_URL}/ad/${id}`);
                console.log(result.data);
                setAd(result.data);
            } catch (err) {
                console.log("err", err);
            }
        };
        fetchAd();
    }, [id]);

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

    if (!adData) {
        return <p>loading</p>
    } else {
        return (
            <form className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const formData = new FormData(form as HTMLFormElement);
                    const formJson = Object.fromEntries(formData.entries());
                    axios.put(`${API_URL}/ad/${id}`, formJson)
                    console.log(formJson);
                }}
            >
                <label>
                    Titre de l'annonce:
                    <br />
                    <input className="text-field" type="text" name="title" defaultValue={adData?.title} />
                </label>
                <br />
                <label>
                    Description:
                    <br />
                    <input className="text-field" type="text" name="description" defaultValue={adData?.description} />
                </label>
                <br />
                <label>
                    Vendeur:
                    <br />
                    <input className="text-field" type="text" name="owner" defaultValue={adData?.owner} />
                </label>
                <br />
                <label>
                    Prix:
                    <br />
                    <input className="text-field" type="number" name="price" defaultValue={adData?.price} />
                </label>
                <br />
                <label>
                    URL de l'image:
                    <br />
                    <input className="text-field" type="text" name="picture" defaultValue={adData?.picture} />
                </label>
                <br />
                <label>
                    Publié le:
                    <br />
                    <input className="text-field" type="date" name="createdAt" defaultValue={adData?.createdAt
                    } />
                </label>
                <br />
                <label>
                    Ville:
                    <br />
                    <input className="text-field" type="text" name="location" defaultValue={adData?.location} />
                </label>
                <br />
                <select name="category" defaultValue={adData?.category.id} >
                    {categories.map((el) =>
                        <option value={el.id} key={el.id}>
                            {el.name}
                        </option>)}
                </select>
                <button className="button" onClick={notify}>Submit</button>
            </form>
        );
    }
}

export default AdEditForm