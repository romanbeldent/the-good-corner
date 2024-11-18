import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  picture: string;
  description?: string;
  price: number;
  owner?: string;
  category: { id: number; name: string } | undefined | null;
  location?: string;
  createdAt?: string;
  tags?: { id: number; name: string } | undefined | null;
};

const AdCard = ({ id, title, picture, price, category }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ad/${id}`} >
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
          <div className="ad-card-category">{category?.name} </div>
        </div>
      </Link >
    </div >
  );
};

export default AdCard;
