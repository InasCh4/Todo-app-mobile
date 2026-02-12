import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// AsyncStorage is React Native’s simple, promise-based API for persisting small bits
//of data on a user’s device. Think of it as the mobile-app equivalent
//  of the browser’s localStorage, but asynchronous and cross-platform.
export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#FFF7FB", // blush white
  surface: "#FFFFFF", // cards
  text: "#2B1B24", // deep plum
  textMuted: "#7A5B6B", // muted mauve
  border: "#F3D7E6", // soft pink border
  primary: "#FF4DA6", // main pink
  success: "#2EC4A6", // mint (pairs well with pink)
  warning: "#FFB020", // warm honey
  danger: "#FF3B5C", // rosy red
  shadow: "#000000",
  gradients: {
    background: ["#FFF7FB", "#FDE7F2"],
    surface: ["#FFFFFF", "#FFF0F7"],
    primary: ["#FF4DA6", "#E6007A"],
    success: ["#2EC4A6", "#159F86"],
    warning: ["#FFB020", "#F08A00"],
    danger: ["#FF3B5C", "#E11D48"],
    muted: ["#C9A4B6", "#8B6B7A"],
    empty: ["#FFF0F7", "#F7D9E8"],
  },
  backgrounds: {
    input: "#FFFFFF",
    editInput: "#FFF0F7",
  },

  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#120A10",
  surface: "#1C111A",
  text: "#FFEAF4",
  textMuted: "#D2A9BC",
  border: "#3A2131",
  primary: "#FF4DA6",
  success: "#2EC4A6",
  warning: "#FFB020",
  danger: "#FF3B5C",
  shadow: "#000000",
  gradients: {
    background: ["#120A10", "#1C0F18"],
    surface: ["#1C111A", "#241423"],
    primary: ["#FF4DA6", "#B3005E"],
    success: ["#2EC4A6", "#0F8B73"],
    warning: ["#FFB020", "#C96A00"],
    danger: ["#FF3B5C", "#BE123C"],
    muted: ["#6E4A5C", "#3A2131"],
    empty: ["#241423", "#1C111A"],
  },
  backgrounds: {
    input: "#241423",
    editInput: "#2A1630",
  },
  // In dark mode, we want light text on a dark background, so we use "light-content" for the status bar to ensure the icons and text are visible against the dark background.
  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // get the user's choice
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
