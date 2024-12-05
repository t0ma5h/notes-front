import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchNotes } from "../api/api";
import NotesList from "../components/notes/NotesList";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const queryParams = useQueryParams();
  const query = queryParams.get("query") || "";
  const error = queryParams.get("error");

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchNotes(query),
    enabled: !!query,
  });

  if (error === "empty") {
    return (
      <div className="p-4 bg-gray-300 dark:bg-gray-600 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Please enter something to search.
        </p>
      </div>
    );
  }

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

  if (queryError) {
    return <div>Error loading search results</div>;
  }

  if (data?.notes.length === 0) {
    return (
      <div className="p-4 bg-gray-300 dark:bg-gray-600 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          No results found. Please enter a valid search query.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-300 dark:bg-gray-600 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <NotesList notes={data?.notes || []} isLoading={isLoading} />
    </div>
  );
};

export default SearchResultsPage;
