import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchFavorites, fetchNoteById } from "../api/api";
import FavoritesList from "../components/favorites/FavoritesList";
import { Favorite } from "../types";

const FavoritePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });

  const [favoritesWithTitles, setFavoritesWithTitles] = useState<
    Array<Favorite>
  >([]);

  useEffect(() => {
    const fetchTitles = async () => {
      if (data?.favorites) {
        const favoritesWithTitles = await Promise.all(
          data.favorites.map(async (favorite: Favorite) => {
            const noteData = await fetchNoteById(favorite.noteId);
            return {
              ...favorite,
              noteTitle: noteData.note.title,
            };
          })
        );
        setFavoritesWithTitles(favoritesWithTitles);
      }
    };

    fetchTitles();
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-32 m-40">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-500 rounded w-3/4 mb-4"></div>
          <div className="h-5 bg-gray-500 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading favorites</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      <FavoritesList favorites={favoritesWithTitles} />
    </div>
  );
};

export default FavoritePage;
