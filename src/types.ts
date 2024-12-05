export type Category = {
  _id: string;
  title: string;
};

export type Favorite = {
  _id: string;
  noteId: string;
};

export type Note = {
  _id: string;
  title: string;
  body?: string;
  content: string;
  categoryId: string;
};

export type ThemeState = {
  isDarkTheme: boolean;
};

export type ThemeAction = {
  type: "DARK_THEME" | "LIGHT_THEME";
};
