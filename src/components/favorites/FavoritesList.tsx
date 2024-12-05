import { Favorite } from "../../types";
import FavoriteItem from "./FavoriteItem";

interface FavoritesListProps {
  favorites: Array<Favorite>;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap -mx-2">
        {favorites.map((favorite) => (
          <FavoriteItem key={favorite._id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
