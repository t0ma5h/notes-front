export interface ThemeState {
  isDarkTheme: boolean;
}

export interface ThemeAction {
  type: "DARK_THEME" | "LIGHT_THEME";
}

export const initialState: ThemeState = {
  isDarkTheme: false,
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case "DARK_THEME":
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      return {
        ...state,
        isDarkTheme: true,
      };
    case "LIGHT_THEME":
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      return {
        ...state,
        isDarkTheme: false,
      };
    default:
      return state;
  }
};
