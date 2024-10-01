export type CategoryProps = {
  id: number;
  name: string;
};

const CategoryCard = ({ name }: CategoryProps) => {
  return (
    <>
      <a href="" className="category-navigation-link">
        {name}
      </a>{" "}
    </>
  );
};

export default CategoryCard;
