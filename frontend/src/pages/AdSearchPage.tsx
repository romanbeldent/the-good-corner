import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { API_URL } from "../config";
import axios from "axios";
import AdCard, { AdCardProps } from "../components/AdCard";

const AdSearchPage = () => {
    const { keyword } = useParams();
    const [ads, setAds] = useState<AdCardProps[]>([])
    useEffect(() => {
        const fetchAdsFromKeyword = async () => {
            const result = await axios.get(`${API_URL}/ads?title=${keyword}`)
            console.log("result", result);
            setAds(result.data)
        }
        fetchAdsFromKeyword();
    }, [keyword]
    )

    return (
        <div>
            <h2>Search results for keyword: {keyword}</h2>
            <section className="recent-ads">
                {ads.map((el) => (
                    <div key={el.id}>
                        <AdCard
                            id={el.id}
                            title={el.title}
                            picture={el.picture}
                            price={el.price}
                            category={el.category}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};


export default AdSearchPage