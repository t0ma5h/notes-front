import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../api/api";
import NotesList from "../components/notes/NotesList";

const NotesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  return (
    <div className="p-4 bg-gray-300 dark:bg-gray-600 min-h-screen">
      <NotesList notes={data?.notes || []} isLoading={isLoading} />
    </div>
  );
};

export default NotesPage;
