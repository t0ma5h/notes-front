import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoriesPage from "./Pages/CategoriesPage";
import CategoryPage from "./Pages/CategoryPage";
import FavoritePage from "./Pages/FavoritePage";
import HomePage from "./Pages/HomePage";
import NotePage from "./Pages/NotePage";
import NotesPage from "./Pages/NotesPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import CategoryForm from "./components/categories/CategoryForm";
import EditNoteForm from "./components/notes/EditNoteForm";
import NoteForm from "./components/notes/NoteForm";
import { ThemeProvider } from "./theme/ThemeContext";
import { Navbar } from "./utils/Navbar";

const queryClient = new QueryClient({});

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/create-note" element={<NoteForm />} />
          <Route path="/edit-note/:id" element={<EditNoteForm />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/create-category" element={<CategoryForm />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
