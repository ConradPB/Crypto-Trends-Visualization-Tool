import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ onToggle }: { onToggle: () => void }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        className="fixed top-4 right-4 z-50 bg-opacity-80 hover:bg-opacity-100"
        sx={{
          bgcolor: theme.palette.background.paper,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;