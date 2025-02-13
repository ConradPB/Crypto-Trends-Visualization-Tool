import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom"; // Add this import
import { getTheme } from "./theme";
import AppRoutes from "./routes";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  // Update localStorage when theme changes


  return (
    
  );
};

export default App;