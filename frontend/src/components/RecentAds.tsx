import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const adsData: AdCardProps[] = [
    {
      imgUrl: "/images/table.webp",
      title: "Table",
      link: "/ads/table",
      price: 120,
    },
    {
      imgUrl: "/images/bougie.webp",
      title: "Bougie",
      link: "/ads/bougie",
      price: 30,
    },
    {
      imgUrl: "/images/vaisselier.webp",
      title: "Vaisselier",
      link: "/ads/vaisselier",
      price: 80,
    },
    {
      imgUrl: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      link: "/ads/dame-jeanne",
      price: 80,
    },
    {
      imgUrl: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      link: "/ads/porte-magazine",
      price: 40,
    },
    {
      imgUrl: "/images/vide-poche.webp",
      title: "Vide-poche",
      link: "/ads/vide-poche",
      price: 120,
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {adsData.map((el) => (
          <AdCard
            key={el.title}
            title={el.title}
            imgUrl={el.imgUrl}
            link={el.link}
            price={el.price}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;
