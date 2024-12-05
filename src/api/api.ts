import { Category, Favorite, Note } from "../types";

const BASE_URL = "http://localhost:3000";

export const fetchNotes = async () => {
  const response = await fetch(`${BASE_URL}/api/note`);
  return response.json();
};

export const fetchNoteById = async (id?: string) => {
  const response = await fetch(`${BASE_URL}/api/note/${id}`);
  const data = await response.json();
  console.log("Fetched note data:", data);
  return data;
};

export const fetchNotesByCategoryId = async (categoryId?: string) => {
  const response = await fetch(`${BASE_URL}/api/category/${categoryId}`);
  const data = await response.json();
  console.log("Fetched notes by category data:", data);
  return data;
};

export const addNote = async (note: Note) => {
  const response = await fetch(`${BASE_URL}/api/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      body: note.content,
      categoryId: note.categoryId,
    }),
  });
  return response.json();
};

export const updateNote = async (note: Note) => {
  const response = await fetch(`${BASE_URL}/api/note/${note._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      body: note.body,
      categoryId: note.categoryId,
    }),
  });
  return response.json();
};

export const deleteNote = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/note/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/category`);
  return response.json();
};

export const addCategory = async (category: Category) => {
  const response = await fetch(`${BASE_URL}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: category.title }),
  });
  return response.json();
};

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/category/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const fetchFavorites = async () => {
  const response = await fetch(`${BASE_URL}/api/favorites`);
  return response.json();
};

export const toggleFavorite = async ({ noteId }: Favorite) => {
  const response = await fetch(`${BASE_URL}/api/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noteId }),
  });
  return response.json();
};

export const searchNotes = async (query: string) => {
  const response = await fetch(`${BASE_URL}/api/note/search?query=${query}`);
  return response.json();
};
