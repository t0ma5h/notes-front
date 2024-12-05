import { useParams } from "react-router-dom";
import CategoryItem from "../components/categories/CategoryItem";

const CategoryPage = () => {
  const { categoryId, isLoading } = useParams();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-32 m-40">
        <div
          className="spinner-border animate-bounce w-40 h-40 border-8 rounded-full flex justify-center items-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <CategoryItem categoryId={categoryId} />;
};

export default CategoryPage;
