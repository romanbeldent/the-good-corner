import { useParams } from 'react-router-dom';
import AdCard from '../components/AdCard';
import { useAllAdsQuery } from '../generated/graphql-types';

const CategorySearchPage = () => {
    const { keyword } = useParams();
    const { data, loading, error } = useAllAdsQuery({
        variables: { category: keyword },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
        return (
            <div>
                <h2>Search results for keyword: {keyword}</h2>
                <section className="recent-ads">
                    {data.AllAds.map((el) => (
                        <div key={el.id}>
                            <AdCard
                                id={el.id}
                                title={el.title}
                                pictures={el.pictures}
                                price={el.price}
                                category={el.category}
                            />
                        </div>
                    ))}
                </section>
            </div>
        )
    }
}

export default CategorySearchPage