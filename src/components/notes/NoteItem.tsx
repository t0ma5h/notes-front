import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, toggleFavorite } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Modal from "../../utils/Modal";
import { useState } from "react";
import { Category, Note } from "../../types";

interface NoteItemProps {
  note: Note;
  category: Category;
  isFavorite: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, category, isFavorite }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: removeNote } = useMutation({
    mutationFn: deleteNote,
    mutationKey: ["deleteNote"],
  });

  const { mutate: toggleFav } = useMutation({
    mutationFn: toggleFavorite,
    mutationKey: ["toggleFavorite"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteHandler = () => {
    removeNote(note._id, {
      onSuccess: () => {
        navigate("/notes");
      },
    });
    setIsModalOpen(false);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const toggleFavoriteHandler = () => {
    toggleFav({ noteId: note._id });
  };

  const editHandler = () => {
    navigate(`/edit-note/${note._id}`);
  };

  const backToFavoritesHandler = () => {
    navigate("/favorites");
  };

  return (
    <div className="flex justify-center items-center p-20 m-20">
      <div className="p-14 m-8 w-[600px] border rounded-md bg-gray-400">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <button onClick={toggleFavoriteHandler} className="text-red-500">
            {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </button>
        </div>
        <p className="text-lg">{note.body}</p>
        {category && (
          <p className="text-md text-gray-700">Category: {category.title}</p>
        )}
        <div className="flex space-x-4">
          <button
            onClick={deleteHandler}
            className="p-4 m-4 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
          <button
            onClick={editHandler}
            className="p-4 m-4 bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
          {isFavorite && (
            <button
              onClick={backToFavoritesHandler}
              className="p-4 m-4 bg-green-500 text-white rounded-md"
            >
              Back to Favorites
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        onConfirm={confirmDeleteHandler}
        message="Are you sure you want to delete this note?"
      />
    </div>
  );
};

export default NoteItem;
