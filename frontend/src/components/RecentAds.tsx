import { GET_ADS } from "../queries/queries";
import AdCard, { AdCardProps } from "./AdCard";
import { useQuery } from "@apollo/client";

const RecentAds = () => {
  const { loading, error, data } = useQuery(GET_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {data.AllAds.map((el: AdCardProps) => (
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
};

export default RecentAds;
