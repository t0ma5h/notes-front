import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import { fetchNoteById, updateNote, fetchCategories } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "../../types";

type FormType = {
  title?: string;
  content?: string;
  categoryId?: string;
};

const EditNoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: noteData, isLoading: isNoteLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate } = useMutation({
    mutationFn: updateNote,
    mutationKey: ["updateNote"],
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [validationErrors, setValidationErrors] = useState<FormType>({});

  useEffect(() => {
    if (noteData) {
      setFormData({
        title: noteData.note.title,
        content: noteData.note.body,
        categoryId: noteData.note.categoryId,
      });
    }
  }, [noteData]);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: FormType = {};
    if (!formData.title.trim() || formData.title.length <= 3) {
      errors.title = "Title must be longer than 3 characters.";
    }
    if (!formData.content.trim() || formData.content.length <= 3) {
      errors.content = "Content must be longer than 3 characters.";
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      mutate(
        { ...formData, _id: id },
        {
          onSuccess: () => {
            navigate("/notes");
          },
        }
      );
    }
  };

  if (isNoteLoading || isCategoriesLoading) {
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

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Edit Note
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
            {validationErrors.title && (
              <p className="text-red-500">{validationErrors.title}</p>
            )}
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="content"
            >
              Content
            </label>
            <input
              id="content"
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
            {validationErrors.content && (
              <p className="text-red-500">{validationErrors.content}</p>
            )}
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="categoryId"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
              <option value="">Select a category</option>
              {categories?.categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {validationErrors.categoryId && (
              <p className="text-red-500">{validationErrors.categoryId}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditNoteForm;
