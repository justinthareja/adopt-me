import { createContext } from "react";

// pass in a hook
// [state, updater]
const ThemeContext = createContext(["papaya", () => {}]);

export default ThemeContext;
