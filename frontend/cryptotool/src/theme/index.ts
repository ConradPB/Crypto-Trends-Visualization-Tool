import { createTheme, Theme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4facfe', // Primary blue
    },
    secondary: {
      main: '#4db6ac', // Secondary teal
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#81c784', // Success green
    },
    error: {
      main: '#e57373', // Error red
    },
    warning: {
      main: '#ffb74d', // Warning orange
    },
  },
  
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          textTransform: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6', // Primary blue
    },
    secondary: {
      main: '#4db6ac', // Secondary teal
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    success: {
      main: '#4caf50', // Success green
    },
    error: {
      main: '#f44336', // Error red
    },
    warning: {
      main: '#ff9800', // Warning orange
    },
  },
});

export const getTheme = (mode: 'light' | 'dark'): Theme => 
  mode === 'light' ? lightTheme : darkTheme;