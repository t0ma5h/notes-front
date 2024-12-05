import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/api";
import CategoryList from "../components/categories/CategoryList";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div>
      <button
        className="mb-4 p-2 mt-6 bg-gray-500 text-white rounded hover:bg-gray-700"
        onClick={() => navigate("/create-category")}
      >
        Create category
      </button>
      <CategoryList categories={data?.categories || []} isLoading={isLoading} />
    </div>
  );
};

export default CategoriesPage;
