import { useNavigate } from "react-router-dom";
import NoteSkeleton from "../../utils/NoteSkeleton";
import { Note } from "../../types";

interface NotesListProps {
  notes: Array<Note>;
  isLoading: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ notes, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <NoteSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {notes.map((note) => (
        <div
          className="p-14 m-6 w-auto border rounded-md bg-gray-400 justify-center align-middle cursor-pointer font-bold hover:bg-gray-600 transition duration-300 dark:bg-gray-400 dark:hover:bg-gray-300"
          key={note._id}
          onClick={() => navigate(`/note/${note._id}`)}
        >
          {note.title}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
