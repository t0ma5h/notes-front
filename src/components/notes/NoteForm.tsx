import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { addNote, fetchCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/NoteForm.module.scss";
import { Category } from "../../types";

type FormType = {
  title?: string;
  content?: string;
  categoryId?: string;
};

const NoteForm = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addNote,
    mutationKey: ["createNote"],
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [validationErrors, setValidationErrors] = useState<FormType>({});

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

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
    if (!formData.categoryId) {
      errors.categoryId = "Category is required.";
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      mutate(formData, {
        onSuccess: () => {
          navigate("/notes");
        },
      });
      setFormData({
        title: "",
        content: "",
        categoryId: "",
      });
    }
  };

  return (
    <section className={styles["note-form"]}>
      <h2>Add Note</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <div className={styles["form-control"]}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {validationErrors.title && (
              <p className={styles["error-message"]}>
                {validationErrors.title}
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${styles["content-control"]}`}
          >
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            {validationErrors.content && (
              <p className={styles["error-message"]}>
                {validationErrors.content}
              </p>
            )}
          </div>

          <div className={styles["form-control"]}>
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories?.categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {validationErrors.categoryId && (
              <p className={styles["error-message"]}>
                {validationErrors.categoryId}
              </p>
            )}
          </div>
        </div>

        <div className={styles["submit-button"]}>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
