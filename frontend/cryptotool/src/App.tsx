import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, useLocation } from "react-router-dom";
import { getTheme } from "./theme";
import AppRoutes from "./routes";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Create a wrapper component to use useLocation
const NavbarWrapper = () => {
  const location = useLocation();
  return location.pathname !== "/" ? <Navbar /> : null;
};

const App = () => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <NavbarWrapper />
        <ThemeToggle onToggle={toggleTheme} />
        <AppRoutes />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
