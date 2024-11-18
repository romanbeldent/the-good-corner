import { useAllAdsQuery } from "../generated/graphql-types";
import AdCard from "./AdCard";

const RecentAds = () => {
  const { loading, error, data } = useAllAdsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {data.AllAds.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                picture={el.pictures[0]?.url}
                price={el.price}
                category={el.category}
              />
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
