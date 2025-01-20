import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import AppRoutes from './routes';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <ThemeToggle onToggle={toggleTheme} />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;