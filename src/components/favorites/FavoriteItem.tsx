import { useNavigate } from "react-router-dom";
import { Favorite } from "../../types";
import React from "react";

interface FavoriteItemProps {
  favorite: Favorite & { noteTitle?: string };
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ favorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/note/${favorite.noteId}`);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div
        className="cursor-pointer p-4 rounded-lg shadow-md transition duration-300 bg-gray-400 dark:bg-gray-800 hover:bg-red-300 dark:hover:bg-red-300"
        onClick={handleClick}
      >
        <p className="text-lg font-semibold text-gray-900 dark:text-white hover:text-black">
          {favorite.noteTitle}
        </p>
      </div>
    </div>
  );
};

export default FavoriteItem;
