import { createContext } from "react";

// Default value used for typing
const ThemeContext = createContext(["", () => {}]);

export default ThemeContext;
