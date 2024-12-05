import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { initialState, themeReducer } from "./themeReducer";
import { ThemeAction, ThemeState } from "../types";

interface ThemeContextType {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
