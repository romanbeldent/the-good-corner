import { Link } from "react-router-dom";

export type CategoryProps = {
  id: number;
  name: string;
};

const CategoryCard = ({ name }: CategoryProps) => {
  return (
    <>
      <Link className="category-navigation-link" to={`/category/${name}`} >
        {name}
      </Link>
    </>
  );
};

export default CategoryCard;
