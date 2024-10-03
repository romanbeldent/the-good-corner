import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import AdCard, { AdCardProps } from '../components/AdCard';

const CategorySearchPage = () => {
    const { keyword } = useParams();
    const [ads, setAds] = useState<AdCardProps[]>([])
    useEffect(() => {
        const fetchAdsByCategory = async () => {
            const result = await axios.get(`${API_URL}/ads?category=${keyword}`)
            setAds(result.data)
        }
        fetchAdsByCategory();
    }, [keyword]
    );

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
    )
}

export default CategorySearchPage