import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchNotesByCategoryId, deleteCategory } from "../../api/api";
import NotesList from "../notes/NotesList";
import { useState } from "react";
import Modal from "../../utils/Modal";

interface CategoryItemProps {
  categoryId?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ categoryId }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", categoryId],
    queryFn: () => fetchNotesByCategoryId(categoryId),
    enabled: !!categoryId,
  });

  console.log("🚀 ~ CategoryItem ~ categoryId:", categoryId);

  const { mutate: removeCategory } = useMutation({
    mutationFn: deleteCategory,
    mutationKey: ["deleteCategory"],
    onSuccess: () => {
      navigate("/categories");
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteHandler = () => {
    removeCategory(categoryId);
    setIsModalOpen(false);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

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

  if (error) {
    return <div>Error loading notes</div>;
  }

  return (
    <div>
      <button
        className="m-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        onClick={() => navigate("/categories")}
      >
        Back to Categories
      </button>
      <button
        className="m-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={deleteHandler}
      >
        Delete Category
      </button>
      <NotesList notes={data?.notes} isLoading={isLoading} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        onConfirm={confirmDeleteHandler}
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryItem;
