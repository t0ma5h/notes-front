import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { addCategory } from "../../api/api";
import { useNavigate } from "react-router-dom";

type FormType = {
  title?: string;
};

const CategoryForm = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addCategory,
    mutationKey: ["createCategory"],
  });

  const [formData, setFormData] = useState<FormType>({
    title: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: FormType = {};
    if (
      !formData?.title?.trim() ||
      (formData?.title?.length && formData?.title?.length <= 3)
    ) {
      errors.title = "Title must be longer than 3 characters.";
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
          navigate("/categories");
        },
      });
      setFormData({
        title: "",
      });
    }
  };

  return (
    <section className="max-w-4xl mt-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Add Category
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
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
          </div>
        </div>

        <div className="flex justify-center mt-6">
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

export default CategoryForm;
