import React from "react";
import { useNavigate } from "react-router-dom";
import CategorySkeleton from "../../utils/CategorySkeleton";
import { Category } from "../../types";

interface CategoryListProps {
  categories: Array<Category>;
  isLoading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        {Array(6)
          .fill(1)
          .map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <div
          className="p-14 m-6 w-[200px] border rounded-md bg-gray-400 justify-center align-middle cursor-pointer hover:bg-gray-500 transition duration-300"
          key={category._id}
          onClick={() => navigate(`/category/${category._id}`)}
        >
          {category.title}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
