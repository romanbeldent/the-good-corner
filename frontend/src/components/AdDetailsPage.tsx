import { useParams } from "react-router-dom";

const AdDetailsPage = () => {
  const { id } = useParams();
  return <p>{id} of the page</p>;
};

export default AdDetailsPage;
